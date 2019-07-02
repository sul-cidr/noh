import axios from "axios";
import fs from "fs";
import mkdirp from "mkdirp";
import path from "path";
import Papa from "papaparse";
import { convertSecondsToHhmmss } from "../utils";

// this data is loaded dynamically from the React app, so we'll create it
//  outside the Jeykll source folder, and copy it to the build folder with
//  webpack at build time:
const dataFolder = path.join("data");

export const parserConfig = path.join("webpack", "config", "parser.json");

export const regexps = {
  groupedLetters: new RegExp(/(?:^\w|[A-Z]|\b\w)/, "g"),
  whiteSpaces: new RegExp(/\s+/, "gm"),
  betweenBrackets: new RegExp(/\[(.*?)\]/)
};

export const textStyles = {
  $: "normal",
  "%": "justified",
  "#": "extended-vowel"
};
export const defaultTextStyle = "$";

export const voiceStyles = {
  J: "jiutai",
  S: "shite",
  W: "waki",
  Wt: "wakizure",
  A: "aikyōgen"
};

export const ParserException = function(message) {
  this.message = (message && message.toString()) || "";
  this.name = "ParserException";
  process.exitCode = 1;
};

export const logError = (...messages) => {
  [...messages].map(message => console.error(message));
  throw new ParserException(messages && messages[0]);
};

export const toCamelCase = str =>
  str
    .toLowerCase()
    .trim()
    .replace(
      regexps.groupedLetters,
      (ltr, idx) => (idx === 0 ? ltr.toLowerCase() : ltr.toUpperCase())
    )
    .replace(regexps.whiteSpaces, "");

export const toCamelCaseTrim = str => toCamelCase(str.split(/[(?[]/)[0]);

export const normalize = str =>
  str
    .trim()
    .toLowerCase()
    .replace(regexps.whiteSpaces, "-");

export const capitalize = str => str[0].toUpperCase() + str.slice(1);

export const extractVoices = str => [
  str &&
    (str.match(regexps.betweenBrackets) || [null, ""])[1]
      .split(",")
      .map(s => s.trim())
      .filter(Boolean),
  str &&
    str
      .replace(regexps.betweenBrackets, "")
      .replace(regexps.whiteSpaces, " ")
      .trim()
];

export const cleanObject = obj =>
  Object.entries(obj).reduce((acc, [key, val]) => {
    if (val) acc[key] = val;
    return acc;
  }, {});

export const parseTime = str => {
  let hhmmss = str
    .trim()
    .replace(/'/g, ":")
    .replace('"', "")
    .split(":")
    .map(num => num.padStart(2, "0"))
    .join(":");
  const quotes = (str.match(/'/gi) || []).length;
  if (quotes === 1) {
    hhmmss = `00:${hhmmss}`;
  } else if (quotes === 0) {
    hhmmss = `00:00:${hhmmss}`;
  }
  const [hh, mm, ss] = hhmmss.split(":").map(parseFloat);
  const seconds = hh * 3600 + mm * 60 + ss;
  return seconds;
};

export const convertToVtt = (captions, track) => {
  const webvtt = captions.map((caption, index) => {
    const timeCode = `${convertSecondsToHhmmss(
      caption.startTime
    )}.000 --> ${convertSecondsToHhmmss(caption.endTime)}.000`;
    let content;
    if (track in caption) {
      content = caption[track];
    } else {
      content = `<c.transcription>${
        caption.transcription
      }</c>\n<c.translation>(${caption.translation})</c>`;
    }
    return [index + 1, timeCode, content].join("\n");
  });
  return `WEBVTT\n\n${webvtt.join("\n\n")}`;
};

export const extractCells = cells => {
  const texts = [];
  const styles = Object.keys(textStyles);
  let start = null;
  // eslint-disable-next-line no-restricted-syntax
  for (const [index, cell] of cells.entries()) {
    const content = cell.trim();
    let element = null;
    if (content.length !== 0) {
      if (styles.includes(content) && start !== null) {
        const length = index - start + 1;
        const style = textStyles[content];
        Object.assign(texts[start], { length, style });
        start = null;
        element = null;
      } else {
        let [voices, text] = extractVoices(content);
        let styleSymbol = text.slice(-1);
        if (styles.includes(styleSymbol)) {
          text = text.slice(0, -1);
        } else {
          styleSymbol = defaultTextStyle;
        }
        voices = voices.map(voice => voiceStyles[voice]);
        const style = textStyles[styleSymbol];
        start = index;
        element = { text, voices, start, style, length: 1 };
      }
    }
    texts.push(element);
  }
  return texts.filter(Boolean);
};

export const extractRows = rows =>
  rows.reduce(
    (obj, row) =>
      Object.assign(obj, {
        [toCamelCase(row[0])]: {
          value: row[0].toLowerCase().includes("time")
            ? parseTime(row[1])
            : normalize(row[1]),
          grid: extractCells(row.slice(2))
        }
      }),
    {}
  );

export const processPhrases = data => {
  const rows = data.slice(1); // data[0] has section name info
  return [...Array(rows.length).keys()] // range(rows.length)
    .map(idx => {
      const row = rows[idx];
      if (row[0].toLowerCase() === "phrase") {
        const values = extractRows(rows.slice(idx + 1, idx + 10));
        Object.assign(values, { phrase: row[1] });
        return values;
      }
      return null;
    })
    .filter(Boolean);
};

export const processMetadata = data => {
  const keys = data[0]
    .filter(Boolean)
    .map(str => toCamelCaseTrim(str))
    .slice(0, -1); // notes need to be ignored
  const rows = data.slice(1);
  return rows.reduce(
    (obj, row) =>
      Object.assign(obj, {
        [toCamelCaseTrim(row[0])]: cleanObject(
          Object.assign(
            {},
            ...keys.map((key, idx) => ({
              [key]: row[0].toLowerCase().includes("time")
                ? parseTime(row.slice(1)[idx])
                : row.slice(1)[idx]
            }))
          )
        )
      }),
    {}
  );
};

export const processCaptions = data => {
  const keys = data[0].filter(Boolean).map(str => toCamelCaseTrim(str));
  const rows = data.slice(1);
  return rows.map(row =>
    Object.assign(
      {},
      ...[...Array(row.length).keys()].map(idx => ({
        [keys[idx]]: keys[idx].toLowerCase().includes("time")
          ? parseTime(row[idx])
          : row[idx]
      }))
    )
  );
};

export const downloadCSV = url =>
  axios
    .get(url.replace("edit#gid", "export?format=csv&gid"))
    .then(response =>
      Papa.parse(response.data.trim(), { skipEmptyLines: true })
    )
    .catch(error => logError(`Unable to download ${url}`, error));

export const main = (configPath, quiet) => {
  if (!configPath) {
    logError("Usage: parse [path/to/parser.json] [-q/--quiet]");
  }
  const promises = [];
  try {
    const { plays } = JSON.parse(fs.readFileSync(configPath, "utf8"));
    plays.forEach(play => {
      if (!quiet) console.info(`Downloading and parsing ${play.playName}:`);
      play.sections.forEach(section => {
        if (!quiet) console.info(`- ${section.sectionName}`);
        const sectionFilePath = path.join(
          dataFolder,
          play.playName,
          section.sectionName
        );
        const sectionFileName = `${sectionFilePath}.json`;
        promises.push(
          Promise.all(
            [section.phrases, section.metadata, section.captions].map(
              url => (url ? downloadCSV(url) : null)
            )
          )
            .then(data => {
              const [phrases, metadata, captions] = data;
              const sectionData = processMetadata(metadata.data);
              sectionData.playUrl = `/${play.playName}/`;
              sectionData.sectionUrl = `/${play.playName}/${
                section.sectionName
              }/`;
              sectionData.videoUrl = { value: play.videoUrl };
              sectionData.videoDuration = { value: play.videoDuration };
              sectionData.phrases = phrases ? processPhrases(phrases.data) : [];
              sectionData.captions = captions
                ? processCaptions(captions.data)
                : [];
              sectionData.narrative = {
                value: `/${play.playName}/narratives/${
                  section.sectionName
                }.html`
              };
              mkdirp.sync(path.join(dataFolder, play.playName));
              fs.writeFileSync(
                sectionFileName,
                JSON.stringify(sectionData, null, 2)
              );
              return [play, sectionData];
            })
            .catch(error => {
              logError(
                `Unable to process section data for ` +
                  `${play.playName}'s ${section.sectionName}`,
                error
              );
            })
        );
      });
    });
  } catch (error) {
    logError(`Malformed config file ${configPath}`, error);
  }
  process.exitCode = 0;
  return Promise.all(promises)
    .then(metadatas => {
      if (!quiet) console.info("Writing play data:");
      const playSections = metadatas.reduce((map, [play, section]) => {
        /* eslint-disable no-param-reassign */
        if (!(play.playName in map)) {
          map[play.playName] = play;
          map[play.playName].sections = [];
          map[play.playName].captions = [];
          map[play.playName].narrative = `/narratives/${play.playName}/`;
        }
        map[play.playName].captions.push(...section.captions);
        delete section.captions;
        delete section.phrases;
        map[play.playName].sections.push(section);
        /* eslint-enable no-param-reassign */
        return map;
      }, {});
      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const playName in playSections) {
        if (!quiet) console.info(`- ${playName} (captions)`);
        const play = playSections[playName];
        mkdirp.sync(path.join(dataFolder, "captions"));
        const trackFilePath = path.join(dataFolder, "captions", playName);
        play.tracks = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const track of ["translation", "transcription", "combined"]) {
          const trackFileName = `${trackFilePath}.${track}.vtt`;
          fs.writeFileSync(trackFileName, convertToVtt(play.captions, track));
          play.tracks.push({
            label: capitalize(track),
            kind: "subtitles",
            lang: "en",
            url: `/data/captions/${playName}.${track}.vtt`
          });
        }
        delete play.captions;
        play.maxIntensity = Math.max(
          ...play.sections.map(
            section => parseInt(section.intensity.number, 10) || 0
          )
        );
        if (!quiet) console.info(`- ${playName}`);
        mkdirp.sync(dataFolder);
        const playFilePath = path.join(dataFolder, playName);
        const playFileName = `${playFilePath}.json`;
        fs.writeFileSync(playFileName, JSON.stringify(play, null, 2));
      }
    })
    .catch(error => {
      logError(error.message || "Unable to write play data", error);
    });
};

// If used as a CLI
/* istanbul ignore if */
if (!module.parent) {
  main(
    process.argv[2] && process.argv[2][0] !== "-"
      ? process.argv[2]
      : parserConfig,
    ["-q", "--quiet"].includes(process.argv.slice(-1)[0])
  );
}

import fs from "fs";
import axios from "axios";
import mkdirp from "mkdirp";
import MockAdapter from "axios-mock-adapter";

import {
  ParserException,
  logError,
  toCamelCase,
  toCamelCaseTrim,
  normalize,
  extractVoices,
  cleanObject,
  convertToVtt,
  parseTime,
  extractCells,
  extractRows,
  processPhrases,
  processMetadata,
  processCaptions,
  downloadCSV,
  main as parserMain
} from "../scripts/parser";
import fixtures from "./__fixtures__/parser";

const mock = new MockAdapter(axios);

describe("parser", () => {
  let consoleError;
  let consoleInfo;
  let mkdirpSync;

  beforeEach(() => {
    mkdirpSync = mkdirp.sync;
    jest.spyOn(mkdirp, "sync").mockImplementation(() => {});
    consoleError = console.error;
    jest.spyOn(console, "error").mockImplementation(() => {});
    consoleInfo = console.info;
    jest.spyOn(console, "info").mockImplementation(() => {});
  });

  afterEach(() => {
    mkdirp.sync = mkdirpSync;
    console.error = consoleError;
    console.info = consoleInfo;
  });

  it("toCamelCase turns strings to camel case", () => {
    expect(toCamelCase("This is four words")).toEqual("thisIsFourWords");
    expect(toCamelCase("This is four words")).toEqual("thisIsFourWords");
    expect(toCamelCase(" THIS is   FOUR WoRDS ")).toEqual("thisIsFourWords");
  });

  it("toCamelCaseTrim turns strings to camel case and remove strings after ?, ( or [", () => {
    expect(toCamelCaseTrim("This is four words(extra)")).toEqual(
      "thisIsFourWords"
    );
    expect(toCamelCaseTrim("This is four words? MORE TEXT")).toEqual(
      "thisIsFourWords"
    );
    expect(toCamelCaseTrim(" THIS is   FOUR WoRDS[? and this] ")).toEqual(
      "thisIsFourWords"
    );
  });

  it("normalize turns string to lower case, trims spaces and replaces them with dashes", () => {
    expect(normalize("This is four words")).toEqual("this-is-four-words");
    expect(normalize("This is four words")).toEqual("this-is-four-words");
    expect(normalize(" THIS is   FOUR WoRDS ")).toEqual("this-is-four-words");
  });

  it("extractVoices extracts voices tags and takes them out of string", () => {
    const [voices, text] = extractVoices("[ J, S ]   Some text.");
    expect(voices).toEqual(["J", "S"]);
    expect(text).toEqual("Some text.");
  });

  it("cleanObject cleans keys with empty values in a hash map", () => {
    expect(cleanObject({ a: "content", b: null, c: null })).toEqual({
      a: "content"
    });
  });

  it("parses time codes expressed in h'm's.ms\" to seconds.millis", () => {
    expect(parseTime("2'3'3\"")).toEqual(2 * 3600 + 3 * 60 + 3);
    expect(parseTime("3'3\"")).toEqual(3 * 60 + 3);
    expect(parseTime("63'3\"")).toEqual(63 * 60 + 3);
    expect(parseTime("63'")).toEqual(63 * 60);
    expect(parseTime('2"')).toEqual(2);
    expect(parseTime("1'2.234\"")).toEqual(1 * 60 + 2.234);
    expect(parseTime("1'65'65\"")).toEqual(1 * 3600 + 65 * 60 + 65);
  });

  it("extractCells extracts and formats an individual row", () => {
    const row = [
      "",
      "",
      "[Wt]2. Open-retreat.",
      "",
      "",
      "%",
      "[J]Us#",
      "",
      "1. R. Step pivot facing bridge.",
      "",
      "",
      "",
      "",
      "$",
      "",
      "",
      "",
      ""
    ];
    const expected = [
      {
        length: 4,
        start: 2,
        style: "justified",
        text: "2. Open-retreat.",
        voices: ["wakizure"]
      },
      {
        length: 1,
        start: 6,
        style: "extended-vowel",
        text: "Us",
        voices: ["jiutai"]
      },
      {
        length: 6,
        start: 8,
        style: "normal",
        text: "1. R. Step pivot facing bridge.",
        voices: []
      }
    ];
    expect(extractCells(row)).toEqual(expected);
  });

  it("extractRows extracts and formats content for a series of rows", () => {
    expect(extractRows(fixtures.multipleRows)).toMatchSnapshot();
  });

  it("processPhrases parse rows of raw data into structured phrases", () => {
    expect(processPhrases(fixtures.phrases)).toMatchSnapshot();
  });

  it("processMetadata turns metadata into a hash map", () => {
    expect(processMetadata(fixtures.metadata)).toMatchSnapshot();
  });

  it("processCaptions parses caption lines into a list of hash maps", () => {
    expect(processCaptions(fixtures.captions)).toMatchSnapshot();
  });

  it("converts captions into WebVTT format", () => {
    const captions = processCaptions(fixtures.captions);
    expect(convertToVtt(captions, "translation")).toMatchSnapshot();
    expect(convertToVtt(captions, "transcription")).toMatchSnapshot();
    expect(convertToVtt(captions, "combined")).toMatchSnapshot();
  });

  it("logError logs errors and throws an exception", () => {
    expect(() => {
      logError("Error message");
    }).toThrow();
  });

  it("logError logs errors and throws a custom exception", () => {
    expect(() => {
      throw new ParserException();
    }).toThrow();
  });

  it("downloadCSV downloads data from a phrases CSV URL", done => {
    const type = "phrases";
    const url = `/data/${type}.csv`;
    mock.reset();
    mock.onGet(url).reply(200, fixtures.phrasesCSV);
    return downloadCSV(url).then(data => {
      expect(data).toMatchSnapshot();
      done();
    });
  });

  it("downloadCSV downloads data from a metadata CSV URL", done => {
    const type = "metadata";
    const url = `/data/${type}.csv`;
    mock.reset();
    mock.onGet(url).reply(200, fixtures.metadataCSV);
    return downloadCSV(url).then(data => {
      expect(data).toMatchSnapshot();
      done();
    });
  });

  it("downloadCSV downloads data from a captions CSV URL", done => {
    const type = "captions";
    const url = `/data/${type}.csv`;
    mock.reset();
    mock.onGet(url).reply(200, fixtures.captionsCSV);
    return downloadCSV(url).then(data => {
      expect(data).toMatchSnapshot();
      done();
    });
  });

  it("downloadCSV raises an exception when URL is not found", done => {
    const url = "/some/url";
    mock.reset();
    mock.onGet(url).reply(404, "");
    return downloadCSV(url).catch(error => {
      expect(error.message).toMatch(`Unable to download ${url}`);
      done();
    });
  });

  it("downloadCSV raises an exception when URL does not exist", done => {
    const url = "http://some.fake.url/";
    return downloadCSV(url).catch(error => {
      expect(error.message).toMatch(`Unable to download ${url}`);
      done();
    });
  });

  it("downloadCSV raises an exception when protocol is unknown", done => {
    const url = "proto://some.fake.url/";
    return downloadCSV(url).catch(error => {
      expect(error.message).toMatch(`Unable to download ${url}`);
      done();
    });
  });

  it("main raises an exception when no config is given", () => {
    expect(() => {
      parserMain(null);
    }).toThrow();
  });

  it("main raises an exception when config is malformed", () => {
    const spy = jest
      .spyOn(fs, "readFileSync")
      .mockReturnValueOnce(JSON.stringify(0));
    expect(() => {
      parserMain("path/to/config", true);
    }).toThrow();
    spy.mockRestore();
  });

  it("main downloads and parses phrases, metadata, and captions", done => {
    mock.reset();
    mock
      .onGet(fixtures.config.plays[0].sections[0].phrases)
      .reply(200, fixtures.phrasesCSV)
      .onGet(fixtures.config.plays[0].sections[0].metadata)
      .reply(200, fixtures.metadataCSV)
      .onGet(fixtures.config.plays[0].sections[0].captions)
      .reply(200, fixtures.captionsCSV);
    const spyRead = jest
      .spyOn(fs, "readFileSync")
      .mockReturnValueOnce(JSON.stringify(fixtures.config));
    const spyWrite = jest
      .spyOn(fs, "writeFileSync")
      .mockImplementation((file, jsonData) => {
        expect(jsonData).toMatchSnapshot();
      });
    return parserMain("path/to/config", false).then(() => {
      spyRead.mockRestore();
      spyWrite.mockRestore();
      done();
    });
  });

  it("main writes to console when -q/--quiet is not passed in", done => {
    mock.reset();
    mock
      .onGet(fixtures.config.plays[0].sections[0].phrases)
      .reply(200, fixtures.phrasesCSV)
      .onGet(fixtures.config.plays[0].sections[0].metadata)
      .reply(200, fixtures.metadataCSV)
      .onGet(fixtures.config.plays[0].sections[0].captions)
      .reply(200, fixtures.captionsCSV);
    const spyRead = jest
      .spyOn(fs, "readFileSync")
      .mockReturnValueOnce(JSON.stringify(fixtures.config));
    const spyWrite = jest
      .spyOn(fs, "writeFileSync")
      .mockImplementation(() => {});
    return parserMain("path/to/config", false).then(() => {
      expect(console.info.mock.calls).toMatchSnapshot();
      spyRead.mockRestore();
      spyWrite.mockRestore();
      done();
    });
  });

  it("main raises an exception when data parsing fails", done => {
    mock.reset();
    mock
      .onGet(fixtures.config.plays[0].sections[0].phrases)
      .reply(200, "")
      .onGet(fixtures.config.plays[0].sections[0].metadata)
      .reply(200, "")
      .onGet(fixtures.config.plays[0].sections[0].captions)
      .reply(200, "");
    const spyRead = jest
      .spyOn(fs, "readFileSync")
      .mockReturnValueOnce(JSON.stringify(fixtures.config));
    const spyWrite = jest
      .spyOn(fs, "writeFileSync")
      .mockImplementation(() => {});
    return parserMain("path/to/config", true).catch(error => {
      expect(error.message).toMatch("Unable to process section data");
      spyRead.mockRestore();
      spyWrite.mockRestore();
      done();
    });
  });

  it("main raises an exception when writing section data to disk fails", done => {
    mock.reset();
    mock
      .onGet(fixtures.config.plays[0].sections[0].phrases)
      .reply(200, "")
      .onGet(fixtures.config.plays[0].sections[0].metadata)
      .reply(200, "")
      .onGet(fixtures.config.plays[0].sections[0].captions)
      .reply(200, "");
    const spy = jest
      .spyOn(fs, "readFileSync")
      .mockReturnValueOnce(JSON.stringify(fixtures.config));
    return parserMain("path/to/config", true).catch(error => {
      expect(error.message).toMatch("Unable to process section data");
      spy.mockRestore();
      done();
    });
  });

  it("main raises an exception when writing caption data to disk fails", done => {
    mock.reset();
    mock
      .onGet(fixtures.config.plays[0].sections[0].phrases)
      .reply(200, fixtures.phrasesCSV)
      .onGet(fixtures.config.plays[0].sections[0].metadata)
      .reply(200, fixtures.metadataCSV)
      .onGet(fixtures.config.plays[0].sections[0].captions)
      .reply(200, fixtures.captionsCSV);
    const spyRead = jest
      .spyOn(fs, "readFileSync")
      .mockReturnValueOnce(JSON.stringify(fixtures.config));
    const spyWrite = jest
      .spyOn(fs, "writeFileSync")
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(null) // since there are 4 sections in the config
      .mockImplementation(() => {
        throw new ParserException();
      });
    return parserMain("path/to/config", true).catch(error => {
      expect(error.message).toMatch("Unable to write play data");
      spyRead.mockRestore();
      spyWrite.mockRestore();
      done();
    });
  });

  it("main raises an exception when writing play data to disk fails", done => {
    mock.reset();
    mock
      .onGet(fixtures.config.plays[0].sections[0].phrases)
      .reply(200, fixtures.phrasesCSV)
      .onGet(fixtures.config.plays[0].sections[0].metadata)
      .reply(200, fixtures.metadataCSV)
      .onGet(fixtures.config.plays[0].sections[0].captions)
      .reply(200, fixtures.captionsCSV);
    const spyRead = jest
      .spyOn(fs, "readFileSync")
      .mockReturnValueOnce(JSON.stringify(fixtures.config));
    const spyWrite = jest
      .spyOn(fs, "writeFileSync")
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(null) // since there are 4 sections in the config
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(null) // since there are 3 caption files
      .mockImplementation(() => {
        throw new ParserException();
      });
    return parserMain("path/to/config", true).catch(error => {
      expect(error.message).toMatch("Unable to write play data");
      spyRead.mockRestore();
      spyWrite.mockRestore();
      done();
    });
  });
});

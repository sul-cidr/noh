import axios from "axios";
import fs from "fs";
import mkdirp from "mkdirp";
import path from "path";
import Papa from "papaparse";
import { convertSecondsToHhmmss } from "../utils";
import { downloadCSV, parserConfig, logError } from "./parser.js";

const DEFAULT_LAYOUT = "website";
const DEFAULT_IMAGE = "/assets/images/shodan/example.jpg";

export const main = (configPath, quiet) => {
  if (!configPath) {
    logError("Usage: parse [path/to/parser.json] [-q/--quiet]");
  }
  const promises = [];
  try {
    const { catalog } = JSON.parse(fs.readFileSync(configPath, "utf8"));
    const shodans = {};
    promises.push(
      Promise.all(
        catalog.filters.map(
          filter => (filter.url ? downloadCSV(filter.url) : null)
        )
      ).then(responses => {
        catalog.filters.map((filter, index) => {
          const headerRows = responses[index].data
            .slice(0, filter.headers)
            .map(row => row.slice(2));
          const headers = headerRows[0].map((_, i) =>
            headerRows.reduce((p, _, j) => `${p}/${headerRows[j][i]}`, "")
          );
          responses[index].data.slice(filter.headers).forEach(row => {
            const [fileName, name] = row.slice(0, 2);
            shodans[`${fileName}/${name}`] = {
              [[filter.type]]: row
                .slice(2)
                .map((cell, index) => (cell ? headers[index - 2] : null))
                .filter(Boolean)
            };
          });
        });
        console.log(shodans);
      })
    );
    console.log(shodans);
    return promises;
  } catch (error) {
    logError(`Malformed config file ${configPath}`, error);
  }
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

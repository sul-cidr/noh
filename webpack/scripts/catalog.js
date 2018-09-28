import fs from "fs";
import path from "path";
import { downloadCSV, parserConfig, logError } from "./parser.js";

export const main = (configPath) => {
  if (!configPath) {
    logError("Usage: parse [path/to/parser.json]");
  }
  try {
    const { catalog } = JSON.parse(fs.readFileSync(configPath, "utf8"));
    return Promise.all(
      catalog.filters.map(filter => downloadCSV(filter.url))
    ).then(responses => {
      const headers = {};
      const shodans = {};
      catalog.filters.map((filter, index) => {
        const headerRows = responses[index].data
          .slice(0, filter.headers)
          .map(row => row.slice(2));
        headers[[filter.type]] = headerRows[0].map((_, header) =>
          headerRows.reduce((previousRow, _, row) => [...previousRow, headerRows[row][header]].filter(Boolean), "")
        );
        responses[index].data.slice(filter.headers).forEach(row => {
          const [fileName, name] = row.slice(0, 2);
          shodans[`${fileName}/${name}`] = [
            ...(shodans[`${fileName}/${name}`] || []),
            ...row
              .slice(2)
              .map((cell, index) => (cell ? headers[filter.type][index] : null))
              .filter(Boolean)
          ]
        })
      });
      const filters = Object.entries(headers)
        .map(([key, values]) => ({by: key, values}))
      const cards = Object.entries(shodans)
        .map(([key, values]) => ({slug: key.split("/")[0], name: key.split("/")[1], pills: values}))
      return {filters, cards};
    }).then(catalog => {
      fs.writeFileSync(
        path.join("src", "_data", "catalog.json"),
        JSON.stringify(catalog, null, 2)
      );
      return catalog
    })
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
      : parserConfig
  );
}

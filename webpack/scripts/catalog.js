import fs from "fs";
import path from "path";
import { downloadCSV, parserConfig, logError } from "./parser";

export const main = configPath => {
  if (!configPath) {
    logError("Usage: parse [path/to/parser.json]");
  }
  let promises;
  try {
    const { catalog } = JSON.parse(fs.readFileSync(configPath, "utf8"));
    promises = Promise.all(
      catalog.filters.map(filter => downloadCSV(filter.url))
    )
      .then(responses => {
        const headers = {};
        const shodans = {};
        catalog.filters.forEach((filter, index) => {
          const headerRows = responses[index].data
            .slice(0, filter.headers)
            .map(row => row.slice(2));
          headers[[filter.type]] = headerRows[0].map((_, header) =>
            headerRows.reduce(
              (previousRow, __, row) =>
                [...previousRow, headerRows[row][header]].filter(Boolean),
              ""
            )
          );
          responses[index].data.slice(filter.headers).forEach(row => {
            const [fileName, name] = row.slice(0, 2);
            shodans[`${fileName}/${name}`] = [
              ...(shodans[`${fileName}/${name}`] || []),
              ...row
                .slice(2)
                .map(
                  (cell, rowIndex) =>
                    cell ? headers[filter.type][rowIndex] : null
                )
                .filter(Boolean)
            ];
          });
        });
        const filters = Object.entries(headers).map(([key, values]) => ({
          by: key,
          values
        }));
        const cards = Object.entries(shodans).map(([key, values]) => ({
          slug: key.split("/")[0],
          name: key.split("/")[1],
          pills: values
        }));
        return { filters, cards };
      })
      .then(catalogToWrite => {
        fs.writeFileSync(
          path.join("src", "_data", "catalog.json"),
          JSON.stringify(catalogToWrite, null, 2)
        );
        return catalog;
      });
  } catch (error) {
    logError(`Malformed config file ${configPath}`, error);
  }
  return promises;
};
export default main;

// If used as a CLI
/* istanbul ignore if */
if (!module.parent) {
  main(
    process.argv[2] && process.argv[2][0] !== "-"
      ? process.argv[2]
      : parserConfig
  );
}

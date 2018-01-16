// import fs from "fs";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import {
  ParserException,
  logError,
  toCamelCase,
  toCamelCaseTrim,
  normalize,
  extractVoices,
  cleanObject,
  extractCells,
  extractRows,
  processPhrases,
  processMetadata,
  downloadCSV,
  main as parserMain
} from "../scripts/parser";
import fixtures from "./__fixtures__/parser";

const mock = new MockAdapter(axios);

describe("parser", () => {
  let consoleError;
  let consoleInfo;

  beforeEach(() => {
    consoleError = console.error;
    jest.spyOn(console, "error").mockImplementation(() => {});
    consoleInfo = console.info;
    jest.spyOn(console, "info").mockImplementation(() => {});
  });

  afterEach(() => {
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
        voices: ["waki-tsure"]
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

  it("downloadCSV downloads data from a CSV URL", done => {
    const type = "phrases";
    const url = `/data/${type}.csv`;
    mock.reset();
    mock.onGet(url).reply(200, fixtures.phrasesCSV);
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

  // xit("main raises an exception when config is malformed", () => {
  //   expect(() => {
  //     jest.spyOn(fs, "readFileSync").mockReturnValueOnce(JSON.stringify(0));
  //     parserMain("path/to/config", true);
  //   }).toThrow();
  // });

  // xit("main downloads and parses phrases and metadata", done => {
  //   mock.reset();
  //   mock
  //     .onGet(fixtures.config[0].sections[0].phrases)
  //     .reply(200, fixtures.phrasesCSV)
  //     .onGet(fixtures.config[0].sections[0].metadata)
  //     .reply(200, fixtures.metadataCSV);
  //   jest
  //     .spyOn(fs, "readFileSync")
  //     .mockReturnValueOnce(JSON.stringify(fixtures.config));
  //   jest.spyOn(fs, "writeFileSync").mockImplementation((file, jsonData) => {
  //     expect(jsonData).toMatchSnapshot();
  //     done();
  //   });
  //   return parserMain("path/to/config", false);
  // });

  // xit("main writes to console when -q/--quiet is not passed in", done => {
  //   mock.reset();
  //   mock
  //     .onGet(fixtures.config[0].sections[0].phrases)
  //     .reply(200, fixtures.phrasesCSV)
  //     .onGet(fixtures.config[0].sections[0].metadata)
  //     .reply(200, fixtures.metadataCSV);
  //   jest
  //     .spyOn(fs, "readFileSync")
  //     .mockReturnValueOnce(JSON.stringify(fixtures.config));
  //   jest.spyOn(fs, "writeFileSync").mockImplementation(() => {});
  //   return parserMain("path/to/config", false).then(() => {
  //     expect(console.info.mock.calls.length).toBe(2);
  //     done();
  //   });
  // });

  // xit("main raises an exception when data parsing fails", done => {
  //   mock.reset();
  //   mock
  //     .onGet(fixtures.config[0].sections[0].phrases)
  //     .reply(200, "")
  //     .onGet(fixtures.config[0].sections[0].metadata)
  //     .reply(200, "");
  //   jest
  //     .spyOn(fs, "readFileSync")
  //     .mockReturnValueOnce(JSON.stringify(fixtures.config));
  //   jest.spyOn(fs, "writeFileSync").mockImplementation(() => {});
  //   return parserMain("path/to/config", true).catch(error => {
  //     expect(error.message).toMatch("Unable to process section data");
  //     done();
  //   });
  // });

  // xit("main raises an exception when writing data to disk fails", done => {
  //   mock.reset();
  //   mock
  //     .onGet(fixtures.config[0].sections[0].phrases)
  //     .reply(200, "")
  //     .onGet(fixtures.config[0].sections[0].metadata)
  //     .reply(200, "");
  //   jest
  //     .spyOn(fs, "readFileSync")
  //     .mockReturnValueOnce(JSON.stringify(fixtures.config));
  //   return parserMain("path/to/config", true).catch(error => {
  //     expect(error.message).toMatch("Unable to process section data");
  //     done();
  //   });
  // });
});

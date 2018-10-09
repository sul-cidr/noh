import fs from "fs";
import axios from "axios";
import mkdirp from "mkdirp";
import MockAdapter from "axios-mock-adapter";

import { main as catalogMain } from "../scripts/catalog";
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

  it("main raises an exception when no config is given", () => {
    expect(() => {
      catalogMain(null);
    }).toThrow();
  });

  it("main raises an exception when config is malformed", () => {
    const spy = jest
      .spyOn(fs, "readFileSync")
      .mockReturnValueOnce(JSON.stringify(0));
    expect(() => {
      catalogMain("path/to/config", true);
    }).toThrow();
    spy.mockRestore();
  });

  it("main downloads and parses the catalog of sections", done => {
    mock.reset();
    mock.onGet(fixtures.catalog.filters[0].url).reply(200, fixtures.catalogCSV);
    const spyRead = jest
      .spyOn(fs, "readFileSync")
      .mockReturnValueOnce(JSON.stringify(fixtures));
    const spyWrite = jest
      .spyOn(fs, "writeFileSync")
      .mockImplementation((file, jsonData) => {
        expect(jsonData).toMatchSnapshot();
      });
    return catalogMain("path/to/config", false).then(() => {
      spyRead.mockRestore();
      spyWrite.mockRestore();
      done();
    });
  });
});

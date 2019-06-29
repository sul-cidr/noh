import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import contents from "../contents";

const mock = new MockAdapter(axios);

describe("contents fetcher", () => {
  it("play data is retrieved and the callback invoked", () => {
    mock.reset();
    mock
      .onGet("/data/hashitomi.json")
      .reply(200, {
        narrative: "/hashitomi.html",
        title: "Title",
        acts: [{ duration: "00:01:00" }]
      })
      .onGet("/hashitomi.html")
      .reply(200, "Text content");
    contents.play("hashitomi", props => {
      expect(props).toEqual({
        narrative: "Text content",
        title: "Title",
        acts: [{ duration: 60 }]
      });
    });
  });

  it("play data is not retrieved and the error callback invoked", () => {
    mock.reset();
    mock.onGet("/data/hashitomi.json").reply(500);
    contents.play(
      "hashitomi",
      () => {},
      () => {
        expect(true).toBe(true);
      }
    );
  });

  it("play data is retrieved but narrative is not and the error callback is invoked", () => {
    mock.reset();
    mock
      .onGet("/data/hashitomi.json")
      .reply(200, {
        narrative: "/hashitomi.html",
        title: "Title"
      })
      .onGet("/hashitomi.html")
      .reply(500);
    contents.play(
      "hashitomi",
      () => {},
      () => {
        expect(true).toBe(true);
      }
    );
  });

  it("section data is not retrieved and the error callback invoked", () => {
    mock.reset();
    mock.onGet("/data/hashitomi/kiri.json").reply(500);
    contents.section(
      "hashitomi",
      "kiri",
      () => {},
      () => {
        expect(true).toBe(true);
      }
    );
  });

  it("section data is retrieved but narrative is not and the error callback is invoked", () => {
    mock.reset();
    mock
      .onGet("/data/hashitomi/kiri.json")
      .reply(200, {
        narrative: { value: "/hashitomi/narratives/kiri.html" },
        sectionName: { value: "Hashitomi Kiri" },
        startTime: { value: 60 },
        endTime: { value: 120 },
        videoUrl: { value: "url" },
        videoDuration: { value: "00:03:00" },
        captions: [{}, {}],
        play: { value: "Hashitomi" },
        voice: { value: "style" }
      })
      .onGet("/hashitomi/narratives/kiri.html")
      .reply(500);
    contents.section(
      "hashitomi",
      "kiri",
      () => {},
      () => {
        expect(true).toBe(true);
      }
    );
  });

  it("section and narrative data is retrieved but play data is not the error callback is invoked", () => {
    mock.reset();
    mock
      .onGet("/data/hashitomi/kiri.json")
      .reply(200, {
        narrative: { value: "/hashitomi/narratives/kiri.html" },
        sectionName: { value: "Hashitomi Kiri" },
        startTime: { value: 60 },
        endTime: { value: 120 },
        videoUrl: { value: "url" },
        videoDuration: { value: "00:03:00" },
        captions: [{}, {}],
        play: { value: "Hashitomi" },
        voice: { value: "style" }
      })
      .onGet("/hashitomi/narratives/kiri.html")
      .reply(200, "Text content")
      .onGet("/data/hashitomi.json")
      .reply(500);
    contents.section(
      "hashitomi",
      "kiri",
      () => {},
      () => {
        expect(true).toBe(true);
      }
    );
  });

  it("section, narrative, and play data is retrieved and the callback invoked", () => {
    const sectionData = {
      narrative: { value: "/hashitomi/narratives/kiri.html" },
      sectionName: { value: "Hashitomi Kiri" },
      startTime: {},
      endTime: { value: 120 },
      videoUrl: { value: "url" },
      videoDuration: { value: "00:03:00" },
      captions: [{}, {}],
      play: { value: "Hashitomi" },
      voice: { value: "style" }
    };
    const playData = {
      sections: [
        { intensity: { number: 10 } },
        { intensity: { number: null } }
      ],
      maxIntensity: 10,
      tracks: [{}, {}]
    };
    mock.reset();
    mock
      .onGet("/data/hashitomi/kiri.json")
      .reply(200, sectionData)
      .onGet("/hashitomi/narratives/kiri.html")
      .reply(200, "Text content")
      .onGet("/data/hashitomi.json")
      .reply(200, playData);
    contents.section("hashitomi", "kiri", props => {
      expect(props).toEqual({
        ...sectionData,
        narrative: "Text content",
        title: "Hashitomi Kiri",
        startTime: 0,
        duration: 120,
        endTime: 120,
        videoUrl: "url#t=0,120",
        videoDuration: 180,
        captions: [{ phraseID: "0" }, { phraseID: "1" }],
        playName: "Hashitomi",
        singingStyle: "style",
        sections: [
          { intensity: { number: 10 } },
          { intensity: { number: null } }
        ],
        tracks: [{}, {}],
        maxIntensity: 10
      });
    });
  });
});

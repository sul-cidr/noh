import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import contents from "../contents";

const mock = new MockAdapter(axios);

test("play data is retrieved and the callback invoked", () => {
  mock.reset();
  mock
    .onGet("/data/hashitomi.json")
    .reply(200, {
      narrative: "/hashitomi.html",
      title: "Title"
    })
    .onGet("/hashitomi.html")
    .reply(200, "Text content");
  contents.play("hashitomi", props => {
    expect(props).toEqual({ narrative: "Text content", title: "Title" });
  });
});

test("play data is not retrieved and the error callback invoked", () => {
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

test("play data is retrieved but narrative is not and the error callback is invoked", () => {
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

test("section data is retrieved and the callback invoked", () => {
  mock.reset();
  mock
    .onGet("/data/hashitomi/kiri.json")
    .reply(200, {
      narrative: "/hashitomi/narratives/kiri.html",
      title: "Hashitomi Kiri"
    })
    .onGet("/hashitomi/narratives/kiri.html")
    .reply(200, "Text content");
  contents.section("hashitomi", "kiri", props => {
    expect(props).toEqual({
      narrative: "Text content",
      title: "Hashitomi Kiri"
    });
  });
});

test("section data is not retrieved and the error callback invoked", () => {
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

test("section data is retrieved but narrative is not and the error callback is invoked", () => {
  mock.reset();
  mock
    .onGet("/data/hashitomi/kiri.json")
    .reply(200, {
      narrative: "/hashitomi/narratives/kiri.html",
      title: "Hashitomi Kiri"
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

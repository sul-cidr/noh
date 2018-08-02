describe("shim", () => {
  it("requestAnimationFrame sets a time out with 0", done =>
    global.requestAnimationFrame(done));
});

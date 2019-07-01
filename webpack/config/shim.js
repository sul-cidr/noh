// Shim for raf for jest testing to remove warning
// until libs are updated to handle this

global.requestAnimationFrame = callback => {
  setTimeout(callback, 0);
};

jest.mock("lodash.debounce", () => jest.fn(fn => fn));

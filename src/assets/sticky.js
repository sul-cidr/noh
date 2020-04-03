// Ensure the current section in the sticky jump menu is highlighted.

const sections = Array.from(
  document.querySelectorAll(".anchor-menu__element a")
).map(({ hash }) => document.querySelector(hash));

const isInViewport = (elem, { top, height } = elem.getBoundingClientRect()) =>
  top <= window.innerHeight && top + height >= 0;

const isAboveViewport = (elem, { top } = elem.getBoundingClientRect()) =>
  top <= window.innerHeight;

const highlightLinkById = id => {
  document
    .querySelectorAll(`.anchor-menu__element a.current`)
    .forEach(link => link.classList.remove("current"));
  document
    .querySelector(`.anchor-menu__element a[href="#${id}"]`)
    .classList.add("current");
};

const observer = new IntersectionObserver(entries => {
  entries.forEach((/* entry */) => {
    const found = sections.some(section => {
      if (isInViewport(section)) {
        highlightLinkById(section.getAttribute("id"));
        return true;
      }
      return false;
    });
    if (!found) {
      // highlight the closest one off the top of the screen
      sections.every(section => {
        if (isAboveViewport(section)) {
          highlightLinkById(section.getAttribute("id"));
          return true;
        }
        return false;
      });
    }
  });
});

sections.forEach(section => observer.observe(section));

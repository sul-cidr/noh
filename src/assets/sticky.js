// Ensure the current section in the sticky jump menu is highlighted.

const sections = Array.from(
  document.querySelectorAll(".anchor-menu__element a")
).map(link => document.querySelector(link.hash));

const isInViewport = (elem, { top, height } = elem.getBoundingClientRect()) =>
  top <= window.innerHeight && top + height >= 0;

const observer = new IntersectionObserver(entries => {
  entries.forEach((/* entry */) => {
    sections.some(section => {
      if (isInViewport(section)) {
        document
          .querySelectorAll(`.anchor-menu__element a.current`)
          .forEach(link => link.classList.remove("current"));
        document
          .querySelector(
            `.anchor-menu__element a[href="#${section.getAttribute("id")}"]`
          )
          .classList.add("current");
        return true;
      }
      return false;
    });
  });
});

sections.forEach(section => observer.observe(section));

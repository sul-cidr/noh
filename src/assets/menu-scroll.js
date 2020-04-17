/* eslint-disable */
var secondLevelMenu = document.querySelector(
  "nav.second-level-menu__container"
);

if (secondLevelMenu !== null) {
  // Get the offset position and height of the navbar
  var menuTop = secondLevelMenu.offsetTop;
  var menuHeight = secondLevelMenu.offsetHeight;

  var stickyMenu = secondLevelMenu.cloneNode((deep = true));
  stickyMenu.classList.add("sticky");
  document.body.append(stickyMenu);

  var prevScrollPos = window.pageYOffset;

  function headerShowHide() {
    var currentScrollPos = window.pageYOffset;

    // Scrolling up
    if (prevScrollPos > currentScrollPos) {
      if (Math.abs(prevScrollPos - currentScrollPos < 1)) {
        // Scrolling to in-page anchor links can produce sub-pixel
        // "settling" scrolls; ignore these
        return;
      }
      if (currentScrollPos > menuTop) {
        // Slide out floating header if we're not near the page top
        // and we're not scrolling due to clicking an achor link
        if (!jumpInProgress) {
          stickyMenu.classList.add("visible");
        }
      } else {
        // If we scroll into the page top, let header "dock" normally
        stickyMenu.setAttribute("style", "display: none");
        stickyMenu.classList.remove("visible");
        setTimeout(
          () => stickyMenu.setAttribute("style", "display: block"),
          210
        );
      }
      // Scrolling down
    } else {
      // Slide in (hide) the header if we're scrolling down in the page middle
      if (currentScrollPos > menuTop + menuHeight) {
        stickyMenu.classList.remove("visible");
      }
    }
    prevScrollPos = currentScrollPos;
    jumpInProgress = false;
  }

  window.addEventListener("scroll", headerShowHide);
}

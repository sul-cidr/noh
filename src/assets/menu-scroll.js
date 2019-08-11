window.onscroll = function() {
  headerShowHide();
};

var header = document.querySelector("nav.second-level-menu__container");

// Get the offset position and height of the navbar
var sticky = header.offsetTop;
var headerHeight = header.offsetHeight;

var prevScrollPos = window.pageYOffset;
function headerShowHide() {
  var currentScrollPos = window.pageYOffset;

  // Scrolling up
  if (prevScrollPos > currentScrollPos) {
    if (currentScrollPos > sticky) {
      // Slide out floating header if we're not near the page top
      header.classList.remove("sticky-hidden");
      header.classList.add("sticky");
    } else {
      // If we scroll into the page top, let header "dock" normally
      header.classList.remove("sticky");
    }
    // Scrolling down
  } else {
    // Slide in (hide) the header if we're scrolling down in the page middle
    if (currentScrollPos > sticky + headerHeight) {
      header.classList.add("sticky-hidden");
    }
  }
  prevScrollPos = currentScrollPos;
}

// When the user scrolls the page, execute myFunction
window.onscroll = function() {
  headerShowHide();
};

// Get the header
var header = document.querySelector("nav.second-level-menu__container");

// Get the offset position of the navbar
var sticky = header.offsetTop;

var prevScrollPos = window.pageYOffset;
function headerShowHide() {
  var currentScrollPos = window.pageYOffset;

  if (prevScrollPos > currentScrollPos && currentScrollPos > sticky) {
    //header.classList.remove("sticky-hidden");
    header.classList.add("sticky");
  } else {
    //if (currentScrollPos > sticky) {
    header.classList.remove("sticky");
    //header.classList.add("sticky-hidden");
    //}
  }
  prevScrollPos = currentScrollPos;
}

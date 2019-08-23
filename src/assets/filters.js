function attachFilters() {
  var filters = document.querySelectorAll(
    ".filters__content li.filters__element div input[type='checkbox']"
  );
  filters.forEach(function(filter) {
    // Counts
    var title = filter.getAttribute("data-title");
    var count = Array.from(document.querySelectorAll(".filters__card"))
      .map(function(elem) {
        return elem
          .getAttribute("data-pills")
          .split(",")
          .includes(title);
      })
      .filter(Boolean).length;
    filter.nextElementSibling.querySelector("span").innerHTML = `(${count})`;
    // Filtering
    filter.addEventListener(
      "change",
      function(event) {
        var subelements = event.target.parentNode.nextElementSibling;
        // Toggle children when parent is toggled
        if (subelements) {
          Array.from(
            subelements.querySelectorAll(
              "li.filters__sub-element div input[type='checkbox']"
            )
          ).forEach(function(elem) {
            elem.checked = event.target.checked;
          });
        }
        // Toggle parent when children are toggled
        var subelement = event.target.parentNode.parentNode;
        if (
          subelement &&
          subelement.className.includes("filters__sub-element")
        ) {
          var parent = subelement.parentNode.parentNode.querySelector(
            "div input[type='checkbox']"
          );
          var siblings = Array.from(
            subelement.parentNode.parentNode.querySelectorAll(
              "ul li.filters__sub-element input[type='checkbox']"
            )
          );
          var checkedSiblings = siblings.filter(elem => elem.checked).length;
          if (siblings.length === checkedSiblings) {
            parent.indeterminate = false;
            parent.checked = true;
          } else if (checkedSiblings > 0) {
            parent.indeterminate = true;
            parent.checked = false;
          } else {
            parent.indeterminate = false;
            parent.checked = false;
          }
        }
        // Toggle cards depending on filters toggled
        var checked = Array.from(
          document.querySelectorAll(
            ".filters__content li.filters__element div input[type='checkbox']:checked"
          )
        ).map(function(elem) {
          return elem.getAttribute("data-title");
        });
        document.querySelectorAll("a.filters__card").forEach(function(elem) {
          var pills = elem.getAttribute("data-pills").split(",");
          // Get the intersection of pills with checked
          var show = pills.filter(value => checked.indexOf(value) !== -1)
            .length;
          if (checked.length === 0) {
            elem.style.display = "inherit";
          } else {
            elem.style.display = show > 0 ? "inherit" : "none";
          }
        });
        // Avoid jump scrolling down to last (often invisible) card, while
        // ensuring the top row of cards isn't obscured by the sticky header
        document.getElementById("catalog").scrollIntoView();
      },
      false
    );
  });
}

if (document.querySelector(".filters__content")) {
  // in case the document is already rendered
  if (document.readyState != "loading") attachFilters();
  // modern browsers
  else if (document.addEventListener)
    document.addEventListener("DOMContentLoaded", attachFilters);
  // IE <= 8
  else
    document.attachEvent("onreadystatechange", function() {
      if (document.readyState == "complete") attachFilters();
    });
}

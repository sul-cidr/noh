function attachTabs() {
  var tabClass = "react-tabs__tab";

  var containers = document.querySelectorAll("div.tabs-container");
  containers.forEach(function(container) {
    var ul = document.createElement("ul");
    ul.classList.add(`${tabClass}-list`);

    var sections = container.querySelectorAll("section");
    sections.forEach(function(section, idx) {
      var li = document.createElement("li");
      li.classList.add(tabClass);
      li.setAttribute("role", "tab");
      if (idx == 0) {
        section.style.display = "block";
        li.classList.add(`${tabClass}--selected`);
        li.setAttribute("aria-selected", "true");
      } else {
        section.style.display = "none";
        li.setAttribute("aria-selected", "false");
      }
      li.setAttribute("aria-controls", "tabs-" + (idx + 1));
      li.appendChild(document.createTextNode(section.title));

      li.addEventListener("click", function() {
        var lis = ul.querySelectorAll(`li.${tabClass}`);
        // Deactivate all of the tabs and content panes
        lis.forEach(function(li_) {
          li_.classList.remove(`${tabClass}--selected`);
          li.setAttribute("aria-selected", "false");
        });
        sections.forEach(function(section_) {
          section_.style.display = "none";
        });
        // (Re)activate the clicked tab and its content pane
        li.classList.add(`${tabClass}--selected`);
        li.setAttribute("aria-selected", "true");
        section.style.display = "block";
      });
      ul.appendChild(li);
    });
    container.querySelector("div.wrapper").children[0].appendChild(ul);
  });
}

/* It would be preferable to remove this entire section and instead just make
 * sure that tabs.js is being loaded after all of the HTML on any page on
 * which it is used.
 */
if (document.readyState != "loading") attachTabs();
// modern browsers
else if (document.addEventListener)
  document.addEventListener("DOMContentLoaded", attachTabs);
// IE <= 8
else
  document.attachEvent("onreadystatechange", function() {
    if (document.readyState == "complete") attachTabs();
  });

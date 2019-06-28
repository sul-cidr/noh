var tabClass = "react-tabs__tab";

function attachTabs() {
  /* This function is run after the page loads. It iterates 
   * through the "dehydrated" tab containers on the page and
   * "hydrates" their tab link bar and contents sections, selecting
   * the first tab by default.
   * A click handler is registered for each tab link, which calls
   * activateTab(). activateTab() is also run at the end of this
   * function if there is a hash fragment in the URL, directing that
   * the specified tab should be activated and brought into focus.
   */

  var containers = document.querySelectorAll("div.tabs-container");
  containers.forEach(function(container) {
    var ul = document.createElement("ul");
    ul.classList.add(`${tabClass}-list`);
    var sections = container.querySelectorAll("section");
    sections.forEach(function(section, idx) {
      var li = document.createElement("li");
      li.classList.add(tabClass);
      li.setAttribute("role", "tab");
      // Activate the first tab by default
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
        activateTab(null, section.id);
      });
      ul.appendChild(li);
    });
    container.querySelector("div.wrapper").children[0].appendChild(ul);
  });

  if (window.location.hash) activateTab();
}

function activateTab(hashEvent, tabID = null) {
  /* This function is called when a tab link is clicked in any of
   * the tab containers on the page, and also when the window's hash
   * fragment changes. It activates the specified tab and, if invoked
   * due to a hash fragment change, scrolls the view to the top of
   * the relevant tab container. The scrolling is ncessary because
   * otherwise the ID placement will cause the browser to scroll to the
   * tab's content pane, which is too low.
   */

  if (tabID == null && window.location.hash)
    tabID = window.location.hash.slice(1);

  var containers = document.querySelectorAll("div.tabs-container");
  containers.forEach(function(container) {
    var matchedSectionIndex = -1;
    var sections = container.querySelectorAll("section");
    sections.forEach(function(section, idx) {
      if (section.id == tabID) matchedSectionIndex = idx;
    });

    // Move on to the next container if this one doesn't contain the tab
    if (matchedSectionIndex < 0) return;

    var ul = container.querySelector("ul");
    var lis = ul.querySelectorAll(`li.${tabClass}`);
    // Deactivate/activate the tabs and content panes
    lis.forEach(function(li_, liIndex) {
      if (liIndex != matchedSectionIndex) {
        li_.classList.remove(`${tabClass}--selected`);
        li_.setAttribute("aria-selected", "false");
      } else {
        li_.classList.add(`${tabClass}--selected`);
        li_.setAttribute("aria-selected", "true");
      }
    });
    sections.forEach(function(section_, sectionIndex) {
      if (sectionIndex != matchedSectionIndex) section_.style.display = "none";
      else section_.style.display = "block";
    });

    if (hashEvent) container.scrollIntoView();
  });
}

window.addEventListener("hashchange", activateTab, false);

attachTabs();

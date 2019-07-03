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
    ul.classList.add(tabClass + "-list");
    var sections = container.querySelectorAll("section");
    sections.forEach(function(section, idx) {
      var li = document.createElement("li");
      li.classList.add(tabClass);
      li.setAttribute("role", "tab");
      li.setAttribute("aria-controls", section.id);
      // Activate the first tab by default
      if (idx == 0) {
        section.style.display = "block";
        li.classList.add(tabClass + "--selected");
        li.setAttribute("aria-selected", "true");
      } else {
        section.style.display = "none";
        li.setAttribute("aria-selected", "false");
      }
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

function activateTab(hashEvent, tabID) {
  /* This function is called when a tab link is clicked in any of
   * the tab containers on the page, and also when the window's hash
   * fragment changes. It activates the tab IDed in the parameter or the URL
   * and, if invoked due to a hash fragment change, scrolls the window to the
   * top of the proper tab container. The manual scrolling is ncessary because
   * the placement of the tab IDs (in the section body, rather than the link)
   * otherwise will cause the browser to scroll too far.
   */

  if (tabID === "undefined" && window.location.hash)
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
    var lis = ul.querySelectorAll("li." + tabClass);
    // Deactivate/activate the tabs and content panes
    lis.forEach(function(li_, liIndex) {
      if (liIndex != matchedSectionIndex) {
        li_.classList.remove(tabClass + "--selected");
        li_.setAttribute("aria-selected", "false");
      } else {
        li_.classList.add(tabClass + "--selected");
        li_.setAttribute("aria-selected", "true");
      }
    });
    sections.forEach(function(section_, sectionIndex) {
      if (sectionIndex != matchedSectionIndex) section_.style.display = "none";
      else section_.style.display = "block";
    });

    if (hashEvent) tabLi.scrollIntoView();
  });
}

window.addEventListener("hashchange", activateTab, false);

document.querySelectorAll('[href*="#"]').forEach(function(link) {
  link.addEventListener("click", function(event) {
    if (link.href == document.location.href) {
      event.preventDefault();
      activateTab(null, link.hash.slice(1));
    }
  });
});

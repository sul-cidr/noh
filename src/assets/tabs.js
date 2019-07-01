var tabClass = "react-tabs__tab";

function attachTabs() {
  /* This function is run after the page loads. It iterates
   * through the "dehydrated" tab containers on the page and
   * "hydrates" their tab link bar and contents sections. It also
   * notices if a section ID matches the value in the URL hash
   * fragment (if present), and calls activateTab() to enable
   * either this tab or else the first tab in the container.
   */

  var tabID = undefined;
  if (window.location.hash) tabID = window.location.hash.slice(1);

  // Iterate through all of the tab containers on the page
  var containers = document.querySelectorAll("div.tabs-container");
  containers.forEach(function(container) {
    var ul = document.createElement("ul");
    ul.classList.add(tabClass + "-list");
    var sections = container.querySelectorAll("section");
    var tabIDtoActivate = undefined;
    var jumpToTab = false;
    sections.forEach(function(section, idx) {
      var li = document.createElement("li");
      li.classList.add(tabClass);
      li.setAttribute("role", "tab");
      li.setAttribute("aria-controls", section.id);

      /* Nominate the tab identified in the URL hash fragment,
       * or else the first tab in the block.
       */
      if (tabID && tabID == section.id) {
        tabIDtoActivate = section.id;
        jumpToTab = true;
      } else if (idx == 0) {
        tabIDtoActivate = section.id;
      }
      li.appendChild(document.createTextNode(section.title));
      li.addEventListener("click", function() {
        activateTab(undefined, section.id, false);
      });
      ul.appendChild(li);
    });
    container.querySelector("div.wrapper").children[0].appendChild(ul);
    activateTab(undefined, tabIDtoActivate, jumpToTab);
  });
}

function activateTab(hashEvent, tabID, jumpToTab = false) {
  /* This function is called when the page is first loaded (after
   * attachTabs() has run), when a tab link is clicked in any of
   * the tab containers on the page, and also when the window's hash
   * fragment changes. It activates the tab IDed in the parameter or the URL
   * and, if invoked due to a hash fragment change or a page load with a hash
   * fragment in the URL, scrolls the window to the top of the appropriate tab
   * container.
   */

  if (tabID === undefined && window.location.hash) {
    tabID = window.location.hash.slice(1);
    jumpToTab = true;
  }

  /* Neet to iterate through all tab containers and their content sections
   * because getElementById() won't find a tab content section if that
   * section/tab has been disabled/deselected.
   */
  var containers = document.querySelectorAll("div.tabs-container");
  containers.forEach(function(container) {
    var matchedSectionIndex = -1;
    var sections = container.querySelectorAll("section");
    sections.forEach(function(_section, idx) {
      if (_section.id == tabID) {
        matchedSectionIndex = idx;
      }
    });
    if (matchedSectionIndex >= 0) {
      sections.forEach(function(_section, idx) {
        _section.style.display = "none";
        if (_section.id == tabID) {
          _section.style.display = "block";
        }
      });
      var lis = container.querySelectorAll("li." + tabClass);
      // Deactivate/activate the tab links
      lis.forEach(function(li_, liIndex) {
        if (liIndex != matchedSectionIndex) {
          li_.classList.remove(tabClass + "--selected");
          li_.setAttribute("aria-selected", "false");
        } else {
          li_.classList.add(tabClass + "--selected");
          li_.setAttribute("aria-selected", "true");
        }
      });
      if (jumpToTab) container.scrollIntoView();
    }
  });
}

attachTabs();

window.addEventListener("hashchange", activateTab, false);

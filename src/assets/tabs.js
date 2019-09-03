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

  if (window.location.hash) activateTab(undefined, undefined, true);
}

function activateTab(hashEvent, eltID, scrollToElt) {
  /* This function is called when a tab link is clicked in any of
   * the tab containers on the page, and also when the window's hash
   * fragment changes. It activates the tab IDed in the parameter or the URL
   * and, if invoked due to a hash fragment change, scrolls the window to the
   * top of the proper tab container.
   */

  if (eltID === undefined && window.location.hash)
    eltID = window.location.hash.slice(1);

  try {
    var section = document.querySelector("section#" + eltID);
  } catch {
    section = null;
    scrollToElt = false;
  }
  if (section) {
    [].forEach.call(section.parentElement.children, function(_section) {
      _section.style.display = "none";
    });

    // Find the associated tab header link via its aria relation
    var tabLi = document.querySelector("[aria-controls='" + eltID + "']");
    [].forEach.call(tabLi.parentElement.children, function(_li) {
      _li.classList.remove(tabClass + "--selected");
      _li.setAttribute("aria-selected", "false");
    });

    tabLi.classList.add(tabClass + "--selected");
    tabLi.setAttribute("aria-selected", "true");
    section.style.display = "block";

    if (hashEvent || scrollToElt) tabLi.scrollIntoView();
  } else {
    // Be sure to scroll to a non-tab anchors as well, if they're clicked
    if (scrollToElt) document.getElementById(eltID).scrollIntoView();
  }
}

attachTabs();

window.addEventListener("hashchange", activateTab, false);

/* When links with hash fragments on the same page are clicked, activateTab()
 * will run, ensuring that the proper tab will be selected and brought into
 * focus -- or, if it the link is to a non-tab achor, its target will be
 * scrolled into view.
 */
document.querySelectorAll('[href*="#"]').forEach(function(link) {
  link.addEventListener("click", function(event) {
    if (link.href == document.location.href) {
      event.preventDefault();
      activateTab(null, link.hash.slice(1), true);
    }
  });
});

function attachTabs() {
  var tabClass = "react-tabs__tab";
  var lu = document.createElement("lu");
  lu.classList.add(`${tabClass}-list`);

  var sections = document.querySelectorAll("section.tabbed-narrative");
  sections.forEach(function(section, idx) {
    var li = `
    <li class="${tabClass}"
        data-tab="${section.id}"
        role="tab"
        aria-selected="false"
        aria-disabled="false"
        aria-controls="tabs-${idx + 1}"
    >
      ${section.title}
    </li>`;
    lu.innerHTML += li;
  });
  document.getElementById("tabs").appendChild(lu);
  var lis = document.querySelectorAll(`li.${tabClass}`);
  [].forEach.call(lis, function(li) {
    li.addEventListener("click", function() {
      lis.forEach(function(li_) {
        li_.classList.remove(`${tabClass}--selected`);
      });
      li.classList.add(`${tabClass}--selected`);
      sections.forEach(function(section_) {
        section_.style.display = "none";
      });
      document.querySelector(
        `section#${li.getAttribute("data-tab")}`
      ).style.display =
        "block";
    });
  });
  // Show contents of first tab by default
  lis[0].click();
}

if (document.querySelector("#tabs")) {
  // in case the document is already rendered
  if (document.readyState != "loading") attachTabs();
  // modern browsers
  else if (document.addEventListener)
    document.addEventListener("DOMContentLoaded", attachTabs);
  // IE <= 8
  else
    document.attachEvent("onreadystatechange", function() {
      if (document.readyState == "complete") attachTabs();
    });
}

function attachFilters() {
  var filters = document.querySelectorAll(".filters__content li.filters__element div input[type='checkbox']");
  filters.forEach(function(filter) {
    filter.addEventListener('change', function(event) {
      var checked = Array.from(document.querySelectorAll(".filters__content li.filters__element div input[type='checkbox']:checked"))
                    .map(function(elem) {return elem.getAttribute("data-title")});
      document.querySelectorAll("a.filters__card").forEach(function(elem) {
        var pills = elem.getAttribute("data-pills").split(",");
        // Get the intersection of pills with checked
        var show = pills.filter(value => -1 !== checked.indexOf(value)).length;
        elem.style.display = show > 0 ? 'block' : 'none';
      });
    }, false);
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

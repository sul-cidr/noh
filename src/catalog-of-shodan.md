---
layout: website
title: Catalog of Shōdan
menu-active: elements
second-level-menu-active: catalog-of-shodan
third-level-menu-active: catalog-of-shodan
permalink: /catalog-of-shodan/
---

{% include second-menu-elements.html %} {% include menu-form-small.html %}

<main class="page-content">
  <div class="text-container">
    <div class="wrapper wrapper--small">
      <h2>Catalog of Shōdan</h2>
      <p>
        The following partial catalog is limited to modules (<em>shōdan</em>)
        from the plays featured in this website: Takasago, Kokaji and Hashitomi. To
        prioritize information about musical characteristics several of the 
        <em>shōdan</em> were recorded in a recital-style performance, and the
        videos were overlaid with simplified notation of the music.
      </p>
    </div>
  </div>
  <a id="catalog"></a>
  {% include filters.html catalog=site.data.catalog-sections images="shodan" %}
</main>

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
        The following partial catalog is limited to <em>shōdan</em>
        from the plays featured on this website: Takasago, Kokaji and Hashitomi.
        To prioritize information about musical characteristics several of the
        <em>shōdan</em> were recorded in a recital-style performance, and the
        videos were overlaid with simplified notation of the music.
      </p>
      <p>
        As Okina features a unique ritual structure and set of
        <em>shōdan</em> distinct from the standard noh repertoire, it has been
        given a separate catalog, which can be found
        <a href="/shodan-in-okina/">here</a>.
      </p>
    </div>
  </div>
  <a id="catalog"></a>
  {% include filters.html catalog=site.data.catalog-sections images="shodan" %}
</main>

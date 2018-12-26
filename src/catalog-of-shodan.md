---
layout: website
second-level-menu-active: catalog-shodan
third-level-menu-active: catalog-of-shodan
permalink: /catalog-of-shodan/
---

{% include second-menu-elements.html %}

{% include menu-instrument-small.html %}
<main class="page-content">
  <div class="text-container">
    <h2>Catalog of Shōdan</h2>
    <p>The music of Noh can be seen as modular not only because of the prescribed vocabulary of melodic and rhythmic patterns that are reused in multiple plays but also because these patterns form larger sections (shōdan) that are sequenced according to function and reoccur throughout the repertoire. There are around one hundred different types of sections that can be categorized into four types: Spoken (kotoba), Chanted (au), Entrance and Exit music, and Dance music.
 </p><p>
The following partial catalog is limited to sections from the two plays featured in this website: Kokaji and Hashitomi, as well as those that are included in Zeami’s original formal model. Most descriptions are supported with an informative video example, others are simply limited to a text description.</p>
  </div>

  {% include filters.html catalog=site.data.catalog-sections images="shodan" %}

</main>

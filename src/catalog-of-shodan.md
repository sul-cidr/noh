---
layout: website
second-level-menu-active: catalog-shodan
permalink: /catalog-of-shodan/
---

{% include second-menu-elements.html %}

<main class="page-content">
  <div class="text-container">
    <h2>Catalog of shodan</h2>
    <p>There are two taiko schools: Komparu and Kanze. Featured NAKATA Hiromi and all examples are from the Komparu tradition.</p>
  </div>

  <div class="filters__container">
    <div class="wrapper">
      <div class="filters__content">
        <div class="filters__controls">
          <h3 class="filters__title">Filter by type of section</h3>
          <ul>
            <li class="filters__element">
              {% include filter-check.html 
                id="type-1"
                title="Spoken"
                amount="18"
                checked="checked"
              %}
            </li>
            <li class="filters__element">
              {% include filter-check.html 
                id="type-2"
                title="Chanted"
                amount="18"
                checked="checked"
              %}
              <ul>
                <li class="filters__element">
                  {% include filter-check.html 
                    id="type-21"
                    title="Recitative Chant"
                    amount="18"
                    checked="checked"
                  %}
                </li>
                <li class="filters__element">
                  {% include filter-check.html 
                    id="type-22"
                    title="Introduction Chant"
                    amount="18"
                    checked="checked"
                  %}
                </li>
                <li class="filters__element">
                  {% include filter-check.html 
                    id="type-23"
                    title="Main Chant"
                    amount="18"
                    checked="checked"
                  %}
                </li>
                <li class="filters__element">
                  {% include filter-check.html 
                    id="type-24"
                    title="Closing Chant"
                    amount="18"
                    checked="checked"
                  %}
                </li>
              </ul>  
            </li>
            <li class="filters__element">
              {% include filter-check.html 
                id="type-3"
                title="Entrance and Exit Music"
                amount="18"
                checked="checked"
              %}
            </li>
            <li class="filters__element">
              {% include filter-check.html 
                id="type-4"
                title="Dance Music"
                amount="18"
                checked="checked"
              %}
            </li>
          </ul>
          <h3 class="filters__title">Filter by act</h3>
          <ul>
            <li class="filters__element">
              {% include filter-check.html 
                id="act-1"
                title="First act (Mae ba)"
                amount="18"
                checked="checked"
              %}
              <ul>
                <li class="filters__element">
                  {% include filter-check.html 
                    id="act-11"
                    title="Waki enters"
                    amount="18"
                    checked="checked"
                  %}
                </li>
                <li class="filters__element">
                  {% include filter-check.html 
                    id="act-12"
                    title="Shite enters"
                    amount="18"
                    checked="checked"
                  %}
                </li>
                <li class="filters__element">
                  {% include filter-check.html 
                    id="act-13"
                    title="Dialogue"
                    amount="18"
                    checked="checked"
                  %}
                </li>
                <li class="filters__element">
                  {% include filter-check.html 
                    id="act-14"
                    title="Shite performs"
                    amount="18"
                    checked="checked"
                  %}
                </li>
                <li class="filters__element">
                  {% include filter-check.html 
                    id="act-15"
                    title="Shite exits"
                    amount="18"
                    checked="checked"
                  %}
                </li>
              </ul>  
            </li>
            <li class="filters__element">
              {% include filter-check.html 
                id="act-1"
                title="Second act (Nochi ba)"
                amount="18"
                checked="checked"
              %}
              <ul>
                <li class="filters__element">
                  {% include filter-check.html 
                    id="act-21"
                    title="Waki waits"
                    amount="18"
                    checked="checked"
                  %}
                </li>
                <li class="filters__element">
                  {% include filter-check.html 
                    id="act-22"
                    title="Shite re-enters"
                    amount="18"
                    checked="checked"
                  %}
                </li>
                <li class="filters__element">
                  {% include filter-check.html 
                    id="act-23"
                    title="Dialogue"
                    amount="18"
                    checked="checked"
                  %}
                </li>
                <li class="filters__element">
                  {% include filter-check.html 
                    id="act-24"
                    title="Shite performs"
                    amount="18"
                    checked="checked"
                  %}
                </li>
                <li class="filters__element">
                  {% include filter-check.html 
                    id="act-25"
                    title="Shite exits"
                    amount="18"
                    checked="checked"
                  %}
                </li>
              </ul>  
            </li>
          </ul>
        </div>
        <div class="filters__card-container">
          {% include filter-card.html
            image="https://i.pinimg.com/originals/11/dd/dd/11dddd3819c2dea16a4074d375a1c58b.jpg"
            title="Tsukizerifu"
            pills="Mae ba,Shite enters"
          %}
          {% include filter-card.html
            image="https://i.pinimg.com/originals/11/dd/dd/11dddd3819c2dea16a4074d375a1c58b.jpg"
            title="Tsukizerifu"
            pills="Mae ba,Shite enters,Chanted,Recitative Chant"
          %}
          {% include filter-card.html
            image="https://i.pinimg.com/originals/11/dd/dd/11dddd3819c2dea16a4074d375a1c58b.jpg"
            title="Tsukizerifu"
            pills="Mae ba,Shite enters,Chanted,Recitative Chant"
          %}
          {% include filter-card.html
            image="https://i.pinimg.com/originals/11/dd/dd/11dddd3819c2dea16a4074d375a1c58b.jpg"
            title="Tsukizerifu"
            pills="Mae ba,Shite enters,Chanted,Recitative Chant"
          %}
        </div>
      </div>
    </div>
  </div>

</main>



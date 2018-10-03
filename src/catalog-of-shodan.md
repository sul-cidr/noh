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
          {% for filter in site.data.catalog.filters %}
            <h3 class="filters__title">Filter by {{ filter.by }}</h3>
            <ul>
              {% assign last = "" %}
              {% assign values = filter.values | sort %}
              {% for value in values %}
                {% if last != "" and value.size != 1 and value.first != last %}
                    </ul>
                  </li>
                  {% assign last = "" %}
                {% endif %}
                {% if value.size != 1 and value.first != last %}
                  <li class="filters__element">
                    {% include filter-check.html
                      id=value.first
                      title=value.first
                      amount=filter.values.size
                      checked="checked"
                    %}
                    <ul>
                  {% assign last = value.first %}
                {% endif %}
                {% if last != "" and value.size == 1 %}
                    </ul>
                  </li>
                  {% assign last = "" %}
                {% endif %}
                <li class="filters__element">
                  {% include filter-check.html
                    id=value
                    title=value.last
                    amount=filter.values.size
                    checked="checked"
                  %}
                </li>
              {% endfor %}
              {% if last != "" %}
                  </ul>
                </li>
                {% assign last = "" %}
              {% endif %}
            </ul>
          {% endfor %}
        </div>
        <div class="filters__card-container">
          {% for card in site.data.catalog.cards %}
            {% assign pills = card.pills | uniq | sort | join: ',' %}
            {% include filter-card.html
              title=card.name
              slug=card.slug
              pills=pills
            %}
          {% endfor %}
        </div>
      </div>
    </div>
  </div>

</main>

<script type="text/javascript" src="/assets/filters.js"></script>

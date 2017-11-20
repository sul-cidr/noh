---
layout: page
title: Shodan
---

<ul class="shodan-list">
  {% for shodan in site.shodan %}
    <li class="shodan-list-item">
      <a href="{{ shodan.url }}">{{ shodan.title}} from {{ shodan.play }}</a>
    </li>
  {% endfor %}
</ul>

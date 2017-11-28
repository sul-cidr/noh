---
layout: page
title: Sections
---

<ul class="section-list">
  {% for section in site.section %}
    <li class="section-list-item">
      <a href="{{ section.url }}">{{ section.title}} from {{ section.play }}</a>
    </li>
  {% endfor %}
</ul>

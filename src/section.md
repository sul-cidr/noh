---
layout: page
title: Sections
---

<h3>Hasitomi sections</h3>
<ul class="section-list">
  {% for section in site.hashitomi %}
    <li class="section-list-item">
      <a href="{{ section.url }}">{{ section.title}} from {{ section.play }}</a>
    </li>
  {% endfor %}
</ul>

<h3>Kokaji sections</h3>
<ul class="section-list">
  {% for section in site.kokaji %}
    <li class="section-list-item">
      <a href="{{ section.url }}">{{ section.title}} from {{ section.play }}</a>
    </li>
  {% endfor %}
</ul>

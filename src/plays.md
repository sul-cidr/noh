---
layout: page
title: Plays
---

<ul class="plays-list">
  {% for play in site.plays %}
    {% unless play.url contains ".html" %}
    <li class="plays-list-item">
      <a href="{{ play.url }}">{{ play.title}} </a>
    </li>
    {% endunless %}
  {% endfor %}
</ul>

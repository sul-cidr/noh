---
layout: page
title: Plays
---

<ul class="plays-list">
  {% for play in site.plays %}
    <li class="plays-list-item">
      <a href="{{ play.url }}">{{ play.title}} </a>
    </li>
  {% endfor %}
</ul>
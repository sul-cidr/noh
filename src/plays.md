---
layout: website
title: Plays
menu-active: plays
permalink: /plays/
---

<div class="list-plays">
  <div class="cards-container">
    {% for play in site.plays %}
      {% unless play.url contains ".html" %}
        {% include card.html
          link=play.url
          image=play.image
          title=play.title
          description="Defines the notion in general and how it can be applied to the analysis of Noh."
        %}
      {% endunless %}
    {% endfor %}
  </div>
</div>
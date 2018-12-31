---
layout: website
title: Plays
menu-active: plays
permalink: /plays/
---
<main class="page-content">
  <div class="text-container">
    <h2>Plays</h2>
    <p>Of the nearly 250  plays regularly performed we have chosen two that through their contrast reveal a wide formal and expressive range of Noh. </p>
  </div>

  <div class="list-plays">
    <div class="cards-container">
      {% for play in site.plays %}
        {% unless play.url contains "/narratives/" %}
          {% include card.html
            link=play.url
            image=play.image
            title=play.title
            description=play.description
          %}
        {% endunless %}
      {% endfor %}
    </div>
  </div>

</main>

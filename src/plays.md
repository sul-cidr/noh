---
layout: website
title: Plays
menu-active: plays
permalink: /plays/
---
<main class="page-content">
  <div class="text-container">
    <h2>List of plays</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> 
  </div>

  <div class="list-plays">
    <div class="cards-container">
      {% for play in site.plays %}
        {% unless play.url contains "/narratives/" %}
          {% include card.html
            link=play.url
            image=play.image
            title=play.title
            description=""
          %}
        {% endunless %}
      {% endfor %}
    </div>
  </div>
</main>

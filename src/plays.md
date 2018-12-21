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
    <p>Hashitomi belonging to the third category of Woman or “Wig” plays (女物) engulfs the viewers in a dream-like tender world of a female protagonist, a ghost of young Lady Yūgao appearing as a flower and reminiscing on her romantic encounter with Prince Genji. </p>
    <p>Kokaji, from the fifth category of Final or Demon plays (鬼物) shows off two male characters, the swordsmith Munechika and a powerful deity from the Inari Shrine as they work together to produce a mighty blade for the Emperor. </p> 
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

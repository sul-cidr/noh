---
layout: website
title: Plays
menu-active: plays
permalink: /plays/
---
<main class="page-content">
  <div class="text-container">
    <h2>Plays</h2>``
    <p>The current Nō repertoire consists of over 210 plays that have traditionally been classified into the following five categories:<br> 
1. God plays (神物) <br> 
2. Warrior plays (修羅物) <br> 
3. Woman or“wig” plays (女物) <br> 
4. Madness and miscellaneous plays (狂乱物)<br> 
5. Final or Demon plays (鬼物). <br> 
To allow our readers to experience a wide range of expression the project features two drastically different plays. Hashitomi, belonging to the third category, engulfs the viewers in a dream-like tender world of a female ghost appearing as a flower. Kokaji, from the fifth category impresses upon us great virtuosity as it tells the story of a collaboration between a swordsmith and a powerful deity. </p> 
     </div>
  
   <div class="list-plays">
    <div class="cards-container">
      {% for play in site.plays %}
        {% unless play.url contains "/narratives/" %}
          {% include card.html
            link=play.url
            image=play.image
            title=play.title
            description="we need two different images and two texts"
          %}
        {% endunless %}
      {% endfor %}
    </div>
  </div>

</main>

---
# You don't need to edit this file, it's empty on purpose.
# Edit theme's home layout instead if you wanna make some changes
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: home
---

<div class="home__image" style="background-image: url('/assets/images/tatsu-side.jpg');"></div>

<div class="home__content">
  <div class="wrapper">
    <h1>Noh as intermedia</h1>
    <p>If one were to define intermedia as a way of forming expression by drawing on relationships between words, music and visuals, Noh Theater would be among its world’s most sophisticated and mighty exemplars. Zeami (c.1363-c.1443) who is credited with having perfected Noh as it still exists today, wrote in his Fûshikaden that in a successful play:</p> 
    <blockquote>
      <p class="blockquote__paragraph">… words should hold interest; the melody should be attractive; points of concentrated interest should be enacted with strong visual appeal. When all these elements come together at once, the entire audience is enchanted.</p> 
    </blockquote>
    <p>This website hopes to untangle some of the idiomatic “coming together” of media in Noh.  To achieve this the material is divided into following three main sections:</p>
    <div class="cards-container">
      {% include card.html
          link="/about-intermedia"
          image="https://i.pinimg.com/originals/11/dd/dd/11dddd3819c2dea16a4074d375a1c58b.jpg"
          icon="icon-intermedia"
          title="Intermedia"
          description="Defines the notion in general and how it can be applied to the analysis of Noh."
      %}
      {% include card.html
          link="/plays"
          image="https://i.pinimg.com/originals/11/dd/dd/11dddd3819c2dea16a4074d375a1c58b.jpg"
          icon="icon-plays"
          title="Plays"
          description="Offers a top-down analytical view of two plays with links to information about its constituent elements and inner workings."
      %}
      {% include card.html
          link="/elements-of-noh"
          image="https://i.pinimg.com/originals/11/dd/dd/11dddd3819c2dea16a4074d375a1c58b.jpg"
          icon="icon-elements"
          title="Intermedia"
          description="Contributes a bottom-up perspective with information about the fundamentals of music, dance, staging and formal organization that is especially relevant to the two analyzed plays."
      %}
    </div>
  </div>
  {% include plot.html
    term="Intermedia"
    definition="Contributes a bottom-up perspective <a href='https://www.google.com'>with information</a> about the fundamentals of music, dance, staging and formal organization that is especially relevant to the two analyzed plays."
  %}
</div>





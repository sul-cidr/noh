---
# You don't need to edit this file, it's empty on purpose.
# Edit theme's home layout instead if you wanna make some changes
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: home
---

<div class="home__image" style="background-image: url('/assets/images/Hashi5.jpg');"></div>
<div class="home__content">
  <div class="wrapper">
    <h1>Noh as Intermedia</h1>
    <p>If one were to define intermedia as a way of forming expression by drawing on relationships between words, music, and visuals, Noh Theater would be among its world’s most sophisticated and mighty exemplars. Zeami (c.1363-c.1443) who is credited with having perfected Nō as it still exists today, wrote in his Fūshikaden that in a successful play:</p> 
    <blockquote>
      <p class="blockquote__paragraph">… words should hold interest; the melody should be attractive; points of concentrated interest should be enacted with strong visual appeal. When all these elements come together at once, the entire audience is enchanted.</p> 
    </blockquote>
    <p>This website hopes to untangle some of the idiomatic “coming together” of media in Noh.  To achieve this, the material is divided into the following three sections:</p>
    <div class="cards-container">
      {% include card.html
          link="/about-intermedia"
          image="/assets/images/Hashitomi-2shite-profile-close.jpg"
          icon="icon-intermedia"
          title="About Intermedia"
      description="defines the notion of intermedia in general and how it is applied in this project."
      %}
      {% include card.html
          link="/plays"
          image="/assets/images/Kokaji-duo2.jpg"
          icon="icon-plays"
          title="Plays"
          description="offers video recordings, libretti, scores, and a detailed intermedia analysis of two contrasting plays."
      %}
      {% include card.html
          link="/elements-of-noh"
          image="/assets/images/Hashitomi-prop-covered.jpg"
          icon="icon-elements"
          title="Elements of Noh"
          description="presents fundamentals of Noh music, movement, and staging, as well as catalogs of standard patterns and forms used in the featured plays. "
      %}
    </div>
  </div>
</div>





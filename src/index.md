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
    <p>If one were to define 'intermedia' as a way of forming expression by drawing on relationships between arts, Noh Theater would be among its world’s most sophisticated and mighty exemplars. Zeami Motokiyo (c.1363-c.1443) who is credited with having perfected Noh as it still exists today, wrote in his <em>Fūshikaden</em> that in a successful play:</p>
    <blockquote>
      <p class="blockquote__paragraph">… words should hold interest; the melody should be attractive; points of concentrated interest should be enacted with strong visual appeal. When all these elements come together at once, the entire audience is enchanted.</p>
      <footer>— <a href="https://google.com">Zeami</a> (tr. Tom Hare)</footer>
    </blockquote>
    <p>In the attempt to untangle some of the unique 'coming together' of artistic media in Noh, the website is divided into the following three sections:</p>
    <div class="cards-container">
      {% include card.html
          link="/about-intermedia"
          image="/assets/images/Hashitomi-2shite-profile-close.jpg"
          icon="icon-intermedia"
          title="About Intermedia"
      description="contextualizes the notion of intermedia in general and how it is applied in this project."
      %}
      {% include card.html
          link="/plays"
          image="/assets/images/Kokaji-duo2.jpg"
          icon="icon-plays"
          title="Plays"
          description="offers video recordings, text, scores, and a detailed intermedia analysis of two contrasting plays."
      %}
      {% include card.html
          link="/elements-of-noh"
          image="/assets/images/Hashitomi-prop-covered.jpg"
          icon="icon-elements"
          title="Elements of Noh"
          description="provides fundamentals of Noh music, movement, and staging, as well as catalogs of standard dance patterns and musical forms used in the featured plays. "
      %}
    </div>
  </div>
</div>
<div class="text-container">
  <p><sup id="reference1">1.</sup> Translated by Tom Hare in <em>Zeami: Performance Notes (Translations from the Asian Classics)</em>, Columbia University Press, 2008,p.48</p>
</div>

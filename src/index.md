---
# You don't need to edit this file, it's empty on purpose.
# Edit theme's home layout instead if you wanna make some changes
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: home
---

<div
  class="home__hero"
  style="background-image: url('/assets/images/Hashi3.jpg');"
>
  <div class="wrapper">
    <div class="home__hero-content">
      <blockquote>
        <p class="blockquote__paragraph">
          …words should hold interest; the melody should be attractive; points
          of concentrated interest should be enacted with strong visual appeal.
          <br />When all these elements come together at once, <br />the entire
          audience is enchanted.
        </p>
        <p class="blockquote__footer" markdown="1">— Zeami[^1]</p>
      </blockquote>
    </div>
  </div>
</div>
<div class="home__intermedia">
  <div class="wrapper">
    <h1 class="home-section__title">What is Intermedia?</h1>
    <p class="home__intermedia-description">
      Intermedia works draw their expression from relationships between media.
      Typically, they combine two or more media layers. The layers may include:
    </p>
    <ul class="home__intermedia-list">
      <li>Spoken or sung text</li>
      <li>Acting</li>
      <li>Visual staging</li>
      <li>Costume</li>
      <li>Movement</li>
      <li>Dance</li>
      <li>Music</li>
    </ul>
    <p class="home__intermedia-description">
      Diverse and powerful examples of intermedia can be found across epochs and
      cultures: Wayang Kulit, Kunqu, Wagner’s operas, Fluxus Happenings, MTV or
      Bollywood, to name a few.
    </p>
  </div>
</div>

<div class="home__plays">
  <div class="wrapper">
    <h2 class="home-section__title">Plays</h2>
    <p class="home-section__description">
      In the attempt to untangle some of the unique 'coming together' of
      artistic media in Noh, the website is divided into the following three
      sections:
    </p>
    {% for play in site.plays %} {% unless play.url contains "/narratives/" %}
    {% include home-play.html link=play.url image=play.image title=play.title
    description=play.description %} {% endunless %} {% endfor %}
  </div>
</div>

<div class="home__elements">
  <div class="wrapper">
    <h2 class="home-section__title">Elements of Noh</h2>
    <p class="home-section__description">
      To better appreciate the intermedia dimensions of Noh, it is helpful to
      know about its structure, and the expressive possibilities of its
      individual elements. In addition to the relevant chapters developed for
      this website, which are mainly focused on elements found in the two
      analyzed plays, the reader can refer to the affiliated
      <a href="https://jparc.online/nogaku/"> website 'Nōgaku' </a> at the
      Japanese Performing Arts Research Consortium
      <a href="https://jparc.online/"> (JPARC)</a> where more information in a
      wider context is provided.
    </p>

    <!-- prettier-ignore -->
    {% include home-element.html link="/form/"
    link-catalog="/catalog-of-shodan/" name-catalog="Catalog of Shōdan"
    image="/assets/images/behindlattice.png" title="Form"
    description="Summarizes the classical formal design and explains its modular
    (<em>shōdan</em>) construction." %} {% include home-element.html
    link="/actors/" image="/assets/images/actor.png" title="Actors"
    description="Lists the categories of actors and their roles in Noh."
    reverse=true %} {% include home-element.html link="/music/"
    image="/assets/images/hayashi.jpg" title="Music" description="Includes
    information about vocal styles, instrumental sounds, rhythmic organization
    and a catalog of nohkan patterns." %} {% include home-element.html
    link="/about-movement/" link-catalog="/movement/" name-catalog="Catalog of
    Kata" image="/assets/images/Hashitomi-2shite-profile-close.jpg"
    title="Movement" description="Introduces principle dance forms, and analyzes
    shimai dances from Hashitomi and Kokaji." reverse=true %} {% include
    home-element.html link="/text/" image="/assets/images/utaibon.png"
    title="Text" description="Introduces categories of text and presents
    libretti of Hashitomi and Kokaji in Romaji transliteration and English
    translation." %} {% include home-element.html link="/staging/"
    image="/assets/images/Kokaji2.png" title="Staging" description="Discusses
    the use of the Noh stage, masks, costumes and properties." reverse=true %}
  </div>
</div>

<!-- prettier-ignore -->
<div class="wrapper">
  <div markdown="1">
* Footnotes must be added below (see
https://github.com/sul-cidr/noh/wiki/Level-0-HTML-components#footnotes-using-markdown-feature)
{:footnotes}
[^1]: Translated by Tom Hare in<em>Zeami: Performance Notes (Translations from the Asian Classics)</em>,Columbia University Press, 2008, p. 48.
  </div>
</div>

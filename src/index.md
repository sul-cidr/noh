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
        <p class="blockquote__footer">
          — Zeami <em>Fūshikaden</em> (tr. Tom Hare)
        </p>
      </blockquote>
    </div>
  </div>
</div>
<div class="home__intermedia">
  <div class="wrapper">
    <h1 class="home-section__title">Why Noh and Intermedia</h1>
    <p class="home__intermedia-description">
      Six centuries ago, the co-creator and great playwright and theorist of Noh
      Theater, Zeami, linked the plays' success to the cultivation and the
      'coming together' of text, visuals and music. Today, the expressive
      interaction of these three layers might be called
      <strong>intermedia</strong>. Whereas the individual artistic elements of
      Noh have been studied extensively, the interactions between them are
      relatively underdiscussed. This project is intended to contribute to the
      understanding and appreciation of Noh by offering in-depth intermedia
      analysis of four <a href="#Plays">plays</a>, introductions to
      <a href="#Elements">elements</a> of Noh, and a general discussion about
      <a href="/noh-as-intermedia/">Noh as intermedia</a>.
    </p>
    <p class="home__intermedia-description">
      The authors wish to express deepest gratitude to our
      <a href="/credits/">collaborators</a> and most importantly to the
      <a href="http://www.kongou-net.com/index.html">Kongō School of Noh</a> for
      partnering with the project.
    </p>
  </div>
</div>

<div class="home__plays">
  <div class="wrapper">
    <h2 id="Plays" class="home-section__title">Plays</h2>
    <p class="home__intermedia-description">
      These pages feature complete recordings and the in-depth intermedia
      analysis of four plays.
    </p>
    {% for play in site.plays %} {% unless play.url contains "/narratives/" %}
    {% include home-play.html link=play.url image=play.image title=play.title
    description=play.description %} {% endunless %} {% endfor %}
  </div>
</div>
<div class="home__elements">
  <div class="wrapper">
    <h2 id="Elements" class="home-section__title">Elements</h2>
    <p class="home__intermedia-description">
      The following pages offer introductions to the formal design of Noh, and
      the building blocks of individual media layers.
    </p>
    <div class="home-elements">
      <!-- prettier-ignore -->
      {% include home-element.html link="/form/"
      link-catalog="/catalog-of-shodan/" name-catalog="Catalog of Shōdan"
      image="/assets/images/behindlattice.png" title="Form"
      description="Summarizes the classical formal design and explains its
      modular (<em>shōdan</em>) construction." %} {% include home-element.html
      link="/actors/" image="/assets/images/actor.png" title="Actors"
      description="Lists the categories of actors and their roles in Noh." %} {%
      include home-element.html link="/music/"
      image="/assets/images/hayashi.jpg" title="Music" description="Includes
      information about vocal styles, instrumental sounds, rhythmic organization
      and a catalog of nohkan patterns." %} {% include home-element.html
      link="/about-movement/" link-catalog="/movement/" name-catalog="Catalog of
      Kata" image="/assets/images/Hashitomi-2shite-profile-close.jpg"
      title="Movement" description="Introduces principal dance forms, and
      analyzes shimai dances from Hashitomi and Kokaji." %} {% include
      home-element.html link="/text/" image="/assets/images/utaibon.png"
      title="Text" description="Introduces categories of text and presents
      libretti from Hashitomi and Kokaji in Romaji transliteration and English
      translation." %} {% include home-element.html link="/staging/"
      image="/assets/images/Kokaji2.png" title="Staging" description="Discusses
      the use of the Noh stage, masks, costumes and properties." %}
    </div>
  </div>
</div>
<div class="home__website">
  <div class="wrapper">
    <p class="home__website-description">
      This website was developed in cooperation with the
      <a href="https://jparc.online/">
        Japanese Performing Arts Research Consortium</a
      >. We would like to invite our readers to visit also an affiliated website
      <a href="https://jparc.online/nogaku/">'Nōgaku.' </a>
    </p>
  </div>
</div>

<!-- prettier-ignore -->

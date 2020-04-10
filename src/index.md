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
        <p class="blockquote__footer">— Zeami (tr. Tom Hare)</p>
      </blockquote>
    </div>
  </div>
</div>
<div class="home__intermedia">
  <div class="wrapper">
    <h1 class="home-section__title">Why Noh as Intermedia?</h1>
    <p class="home__intermedia-description">
      Intermedia art draws its expression from interactions between media. Its
      forms combine layers such as textual, visual and aural. Diverse and
      prominent examples can be found across epochs and cultures: Wayang Kulit,
      Kunqu, Western opera, Fluxus happenings, MTV or Bollywood, to name a few.
      Noh is one of the oldest and most elaborate among them. Its layers
      include: spoken and sung text, stage movement and dance, costumes, masks,
      staging, and music. Each of the layers in Noh has been highly refined and
      plays a substantial role. Moreover, the correspondences between them are
      singular, intricate and wide-ranging.
    </p>
    <p class="home__intermedia-description">
      The <a href="/about-intermedia/" target="_blank">INTERMEDIA</a> section of
      the website is devoted to Noh in general. It discusses the combined
      effects of entire plays and the repertoire overall. Our observations are
      based on provided in-depth analyses of specific
      <a href="#Plays">PLAYS</a>, their <em>dan</em> and <em>shōdan</em>. To
      ground the exploration, the <a href="#Elements">ELEMENTS</a> section
      offers introductions to individual layers of media and their building
      blocks.
    </p>
  </div>
</div>

<div class="home__plays">
  <div class="wrapper">
    <h2 id="Plays" class="home-section__title">Plays</h2>
    {% for play in site.plays %} {% unless play.url contains "/narratives/" %}
    {% include home-play.html link=play.url image=play.image title=play.title
    description=play.description %} {% endunless %} {% endfor %}
  </div>
</div>

<div class="home__elements">
  <div class="wrapper">
    <h2 id="Elements" class="home-section__title">Elements</h2>
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
      title="Movement" description="Introduces principle dance forms, and
      analyzes shimai dances from Hashitomi and Kokaji." %} {% include
      home-element.html link="/text/" image="/assets/images/utaibon.png"
      title="Text" description="Introduces categories of text and presents
      libretti of Hashitomi and Kokaji in Romaji transliteration and English
      translation." %} {% include home-element.html link="/staging/"
      image="/assets/images/Kokaji2.png" title="Staging" description="Discusses
      the use of the Noh stage, masks, costumes and properties." %}
    </div>
  </div>
  <div class="home__plays">
    <div class="wrapper">
      <p class="home__intermedia-description">
        This website was developed in cooperation with the Japanese Performing
        Arts Research Consortium
        <a href="https://jparc.online/"> (JPARC)</a>. We would like to invite
        our readers to visit also an affiliated website
        <a href="https://jparc.online/nogaku/">'Nōgaku.' </a>
      </p>
    </div>
  </div>
</div>

<!-- prettier-ignore -->

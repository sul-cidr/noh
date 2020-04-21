---
layout: website
name: nakanotakane
filter-act:
filter-type:
second-level-menu-active: music
third-level-menu-active: nohkan
---

{% include second-menu-elements.html %} {% include menu-instrument-small.html %}

<main class="page-content">
  <div class="wrapper sidebar-contents">
    <aside class="sidebar-contents__table">
      {% include nohkan-patterns-catalog.html %}
    </aside>
    <section class="sidebar-contents__section">
      <div class="text-container">
        <h2><em>Naka no takane</em></h2>
        <p>
          The pattern consists of two phrases with the following <em>shōga</em>:
        </p>
        <p>
          <em
            >hi-hyo ru ri<br />
            hi-hyo i-ya
          </em>
        </p>
        <p>
          The following examples illustrate the difference in expressive
          inflection given to basic patterns in contrasting contexts. The
          <em>Naka no takane</em> pattern is first heard in its ‘generic’ form,
          and then performed in Kokaji’s <em>Kuse</em>, involving a male deity,
          and in Hashitomi’s <em>Kuse</em>, showcasing a young maiden. The
          stronger attack and faster speed of the former, fitting in the context
          of a divine being, contrast in the latter with a softer attack and
          slower speed to reflect the character of a lady.
        </p>
        <div class="tabs-container">
          <div class="tabs-container__links">
            <div class="wrapper">
              <div id="tabs"></div>
            </div>
          </div>
          <div class="tabs-container__content">
            <div class="wrapper">
              <section id="generic" title="Generic">
                {% include video-no-background.html
                src="https://d3msn78fivoryj.cloudfront.net/Academic_sl/Nohkan-Naka_no_takane_Shoga.mp4"
                %}
              </section>
              <section id="Kokaji" title="Kokaji">
                {% include video-no-background.html
                src="https://d3msn78fivoryj.cloudfront.net/Academic_sl/Nohkan-Kokaji_Naka_no_takane_Shoga.mp4"
                %}
              </section>
              <section id="Hashitomi" title="Hashitomi">
                {% include video-no-background.html
                src="https://d3msn78fivoryj.cloudfront.net/Academic_sl/Nohkan-Hashitomi_Naka_no_takane_Shoga_sl.mp4"
                %}
              </section>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</main>

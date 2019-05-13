---
layout: website
name: taiko-head
filter-act:
filter-type:
second-level-menu-active: music
third-level-menu-active: taiko
---

{% include second-menu-elements.html %}
{% include menu-instrument-small.html %}

<main class="page-content">
<div class="wrapper sidebar-contents">
  <aside class="sidebar-contents__table">
    {% include taiko-patterns-catalog.html %}
  </aside>
  <section class="sidebar-contents__section">
  <div class="text-container">
    <h2><Head</h2>
    <p>Head patterns are used to start and end a rhythmic cycle. Rhythmically it uses a mix of short and long durations to create a freer and irregular structure. We find in this category, among others, the kashira and tsuke gashira patterns.</p>

    <div class="tabs-container">
      <div class="tabs-container__links">
        <div class="wrapper">
          <div id="tabs"></div>
        </div>
      </div>
      <div class="tabs-container__content">
        <div class="wrapper">
        <section id="tab-1" title="Kashira" class="tabbed-narrative">

        {% include video-no-background.html
          src="http://d7rcwrflqckpu.cloudfront.net/Academic_sl/Taiko-Kashira.mp4"
        %}

        </section>
        <section id="tab-2" title="Kokaji-Kuse" class="tabbed-narrative">
          <p>Kokaji’s <em>kuse</em> appears in the first act. It is sung in <a href="/music/voices#Tsuyogin" target="_blank"><em>tsuyogin</em></a> style by the jiutai and shite, who sings three verses. It is accompanied by the two hand-percussion instruments and the nohkan.</p>
          {% include video-no-background.html
            src="http://d7rcwrflqckpu.cloudfront.net/Shodan_sl/Kokaji-Kuse_Score.mp4"
          %}
        </section>
        </div>
      </div>
    </div>

  </div>
  </section>
  </div>
</main>

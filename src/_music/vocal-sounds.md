---
layout: website
menu-active: elements
second-level-menu-active: music
third-level-menu-active: voices
fourth-level-menu-active: sound
---

{% include second-menu-elements.html %}

{% include menu-instrument-small.html %}

<main class="page-content">

<div class="wrapper">
<h2 id="Voices">Voices (should be in h1)</h2>
    {% include menu-voices.html %}
  </div>

  <div class="text-container">
    <h2 id="Sound">Vocal Sounds</h2>
    <p>The vocal production in Noh is highly stylized and falls into two general categories: spoken and chanted</p>
    </div>
    <div class="tabs-container">
      <div class="tabs-container__links">
        <div class="wrapper">
          <div id="tabs"></div>
        </div>
      </div>
<div class="tabs-container__content">
  <div class="wrapper">
    <section id="Spoken" title="Spoken" class="tabbed-narrative">

    <p>
    The spoken sections called <em>kotoba</em> consist of non-rhythmical prose intoned with a full voice. Usually, sentences are divided into two parts: a gradual rising tone reaching a peak followed by a falling off.  In the text transcription of the video excerpts the colored syllables are used to identify the higher pitches leading to the descent.
</p><p>
Sections in <em>kotoba</em> are always delivered by an actor, never by the jiutai. The difference in style between the shite's and waki's kotoba can be heard in the following examples: Hashitomi - Nanori, Kokaji - Nanori, and Kokaji - Mondō

    </p>


    {% include v-kotoba1.html src="http://d7rcwrflqckpu.cloudfront.net/bh626gj8179_sl.mp4" %}
    {% include vnb-kotoba2.html src="http://d7rcwrflqckpu.cloudfront.net/bh626gj8179_sl.mp4" %}
    {% include video.html 
      src="http://d7rcwrflqckpu.cloudfront.net/bh626gj8179_sl.mp4"
      link="Shite and waki (Roll over for info)"
      title="Kokaji – Mondō"
      paragraph1="The mondō from Kokaji is a spoken dialogue between the shite (a divine being) and waki (sword maker). The former sits on the left, and the latter on the right. This example offers two points of comparison between the kotoba styles of shite and waki."
      paragraph2="The first point relates to the gradual rising tone. While they both use a rising line to get to a peak-tone, the overall ascent of the shite’s line is more subdued compared with the waki’s. The second point relates to the rhythm of delivery, the shite’s being much slower than the waki."
      paragraph3="These are not to be understood as universal stylistic characteristics, but rather as performance differences, the shite’s less flamboyant style being well suited for a deity rather than a mere human played by the waki."
    %}
</section>



        <section id="Chanted" title="Chanted" class="tabbed-narrative">
        <p>
The chanted music called <em>utai</em> can be sung in two different styles: <em>yowagin</em> – a gentler melodic singing and <em>tsuyogin</em> – a more forceful and dramatic one.
        </p>

      <h3 id="Yowagin">Yowagin</h3>
        <p>
        When singing in yowagin style, the actor uses a modest vibrato producing melodies with clearly perceptible stable pitches. This style is used for passages expressing elegance and pathos.
         </p><p>
        The ‘tonic’ of a chant in Nō is not absolute but determined by the performer, however the chant’s intervals are fixed. The entire range covers two octaves and it is divided up into four register zones: Very low, Low, Prime, and High, each one covering more or less the span of a perfect fourth.
         </p><p>
        Pitches being relative they are referred to by name rather than by pitch. The three most important pitches are the Low, Medium, and High (in our example B2, E3, and A3 respectively), and the majority of the chants are set around these three pole-pitches. Intermediate pitches are used to melodically flow from one of these pole-pitches to another.
        Finally, the lower and higher ranges are extended with the addition of the low ryo and the ryo (E2 and F#2 respectively) for the former, and the kuri and high kuri (C4 and E4 respectively) for that later.

        </p>
        {% include image.html src="/assets/images/Yowagin-range.jpg" %}
        <p>
       Pitches being relative they are referred to by name rather than by pitch. The three most important pitches are the Low, Medium, and High (in our example B2, E3, and A3 respectively), and the majority of the chants are set around these three pole-pitches. Intermediate pitches are used to melodically flow from one of these pole-pitches to another.
       Finally, the lower and higher ranges are extended with the addition of the low ryo and the ryo (E2 and F#2 respectively) for the former, and the kuri and high kuri (C4 and E4 respectively) for that later.

       </p>
        {% include vnb-yowagin.html src="http://d7rcwrflqckpu.cloudfront.net/bh626gj8179_sl.mp4" %}



      <h3 id="Tsuyogin">Tsuyogin</h3>

        <p>While singing in tsuyogin style, the actor uses a notable vibrato with utterances usually contained within a small range span. This style is used for most dramatic passages such as those expressing excitement, bravery, or solemnity.
 </p><p></p><p>
The actors are not attempting to produce specific melodic pitches. Their singing oscillates mainly within a minor third shown below as Low and Medium/High tones. However, at specific moments the Medium/High tone is embellished by higher tones.
</p>
  {% include image.html src="/assets/images/Tsuyogin-range.jpg" %}
  {% include vnb-tsuyogin.html src="http://d7rcwrflqckpu.cloudfront.net/bh626gj8179_sl.mp4" %}


      </section>
      </div>
        </div>
        </div>
      {% include menu-voices.html %}
      {% include menu-instrument-small.html %}
      {% include second-menu-elements.html %}
</main>

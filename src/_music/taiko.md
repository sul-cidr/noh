---
layout: website
menu-active: elements
second-level-menu-active: music
third-level-menu-active: taiko
fourth-level-menu-active: sound
---

{% include second-menu-elements.html %}
{% include menu-instrument-small.html %}

<main class="page-content"><div class="wrapper sidebar-contents">
  <aside class="sidebar-contents__table">
    {% include menu-taiko.html %}
  </aside>
  <section class="sidebar-contents__section">
  <div class="text-container">
    <h2 id="Taiko">Taiko (Stick Drum)</h2>

    <p>There are two taiko schools: Komparu and Kanze. Featured NAKATA Hiromi and all examples are from the Komparu tradition.</p>
    <h3 id="Strokes">Strokes</h3>
    <p>There are five basic sounds and one soundless motion (<em>kesubachi</em>) produced on the taiko drum:</p>

    {% include taiko-sounds.html %}

    <h3 id="Kakegoe">Kakegoe</h3>
    <p>The taiko players use the following kakegoe: <em>yo, ho, iyo and yoi</em> (<em>ei</em> in Kanze school). The exact pronunciation of vowels as well as dynamic and melodic shape can significantly vary depending on the dramatic context, school and performer. Click below to hear examples of calls for the Komparu tradition:</p>
    {% include taiko-kakegoe.html %}

    <h3 id="Patterns">Rhythmic Organization</h3>
    <p>At a basic level, the sounds of the taiko are sequenced to create patterns. Most patterns are eight beats long and typically start on the 2nd or 6th beat of the 8-beat metric unit (<em>honji</em>). However, there are patterns as short as two and as long as forty-eight beats. The patterns are sequenced into larger phrases and sections. They are selected and ordered according to various sets of rules based on their formal function. A pattern can assume one of the following functions: Head, First Transition, Ground, Second Transition, or Closing.</p>
    {% include taiko-patterns.html %}

    <p>The following figure shows an example of how patterns are sequenced to create a cycle.</p>
    {% include image.html src="/assets/images/taiko-patterns-cycle.png" %}

    <p>This sequence from Head to Closing and back to Head, which follows the Section Opening, functions as a cycle that may be repeated until the Closing Section patterns end the module.
    The Ground pattern can repeat multiple times before moving to a pattern from another category. The cycle is unidirectional and normally closes with the Head pattern. As the sequence moves to a new cycle, a different pattern for each category can be used, but the decision about the selection, repetition of a pattern, and/or the omission of a specific category is strictly prescribed and memorized by the performers.
</p>

    <p>Here is an example of a basic sequence of rhythmic patterns.</p>

    <h4>Basic sequence of patterns</h4>
    {% include image.html src="/assets/images/basic-cycle-taiko.png" %}
    {% include video-no-background.html
      src="http://d7rcwrflqckpu.cloudfront.net/Academic_sl/Taiko-Cycle_of_patterns.mp4"
    %}

    <h4>Sequence of patterns in Kokaji's Maibataraki</h4>
    <p>The <em>Maibataraki</em> dance from Kokaji follows immediately a <em>Noriji</em> chant. The Closing pattern, <em>uchikomi</em>, which begins the recording, followed by the Head pattern, <em>kashira</em>, close the chant module and signal the imminent beginning of the <em>Maibataraki</em>, whose principal rhythmic sequence starts with the Head pattern, <em>tsuke gashira</em> (third line). The last <em>uchikomi</em> and <em>kashira</em> patterns (fifth and sixth lines) form the dance’s Closing section.</p>

    {% include image.html src="/assets/images/taiko-maibataraki.png" %}
    {% include video-no-background.html
      src="http://d7rcwrflqckpu.cloudfront.net/Academic_sl/Taiko-Maibataraki_Patterns_sl.mp4"
    %}

  </div>
  </section>
  </div>
</main>

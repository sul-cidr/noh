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

    <h3 id="Sounds">Sounds</h3>
    <p>There are two taiko schools: Komparu and Kanze. Featured NAKATA Hiromi and all examples are from the Komparu tradition.</p>
    <p>There are five basic sounds and one soundless motion (<em>kesubachi</em>) produced on the taiko drum:</p>

    {% include taiko-sounds.html %}

    <h4 id="Kakegoe">Kakegoe</h4>
    <p>The taiko players use the following kakegoe: <em>yo, ho, iyo and yoi</em> (<em>ei</em> in Kanze school). The exact pronunciation of vowels as well as dynamic and melodic shape can significantly vary depending on the dramatic context, school and performer. Click below to hear examples of calls for the Komparu tradition:</p>
    {% include taiko-kakegoe.html %}

    <h2 id="Patterns">Rhythmic Organization</h2>
    <p>At a basic level the sounds of the taiko are sequenced to create patterns. Most patterns are eight beats long and typically start on the 2nd or 6th beat of the 8-beat metric unit (<em>honji</em>). However there are patterns as short as two and as long as twenty-four beats in duration. The patterns are sequenced into larger phrases and sections. They are selected and ordered according to various sets of rules based on their formal function. A pattern can assume a following function: Head, First Transition, Ground, Second Transition, or Closing.</p>
    {% include taiko-patterns.html %}

    <p>The following figure shows one example of standard categories of patterns used in dance and <em>ōnori</em> chants; and how they can be sequenced.</p>
    {% include image.html src="/assets/images/taiko-patterns-cycle.png" %}

    <p>This sequence from Head to Closing and back to Head, which follows the Section Opening can function as one large phrase that maybe repeated until Closing Section patterns end the module.
    The Ground pattern and only the Ground pattern can be repeated multiple times before moving on to the next stage. The phrase is unidirectional and it normally closes with the Head pattern. Moreover, as the sequence moves to a new cycle a different pattern for each category can be used, but the decision about the selection, repetition, or omission of a specific pattern is strictly prescribed and memorized by the performers.</p>

    <p>Here is an example of a basic sequence of rhythmic patterns, then put in context with the dance <em>maibataraki</em> from Kokaji.</p>

    <h3>Basic sequence of patterns</h3>
    {% include image.html src="/assets/images/basic-cycle-taiko.png" %}
    {% include video-no-background.html
      src="http://d7rcwrflqckpu.cloudfront.net/Academic_sl/Taiko-Cycle_of_patterns.mp4"
    %}

    <h3>Sequence of patterns in Kokaji's Maibataraki</h3>
    <p>The <em>maibataraki</em> dance from Kokaji follows immediately a <em>noriji</em> chant. The Closing pattern <em>uchiko</em> that begins the recording followed by the Head pattern <em>kashira</em> are closing the chant module and signal the imminent beginning of the <em>maibataraki</em>, whose principal rhythmic sequence starts with the Head pattern <em>tsuke gashira</em> (third line). The last <em>uchiko</em> and <em>kashira</em> patterns (fifth and sixth lines) form the dance’s Closing section.</p>

    {% include image.html src="/assets/images/taiko-maibataraki.png" %}
    {% include video-no-background.html
      src="http://d7rcwrflqckpu.cloudfront.net/Academic_sl/Taiko-Maibataraki_Patterns.mp4"
    %}

  </div>
  </section>
  </div>
</main>

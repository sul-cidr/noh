---
layout: website
title: Plays
menu-active: plays
permalink: /plays/
---
<main class="page-content">

<div class="text-container">
    <h2 id="plays-intro">Why Hashitomi and Kokaji?</h2>
    <p><em>By Tom Hare</em>
</p>
    <p>The modern repertory of noh comprehends more than two hundred plays, depending on how one counts them, so what is it that makes these two particular plays, <em>Kokaji</em> and <em>Hashitomi</em>, the focus of this project?</p>
    </div>
<div class="list-plays">
  <div class="cards-container">
    {% for play in site.plays %}
      {% unless play.url contains "/narratives/" %}
        {% include card.html
          link=play.url
          image=play.image
          title=play.title
          description=play.description
        %}
      {% endunless %}
    {% endfor %}
  </div>
</div>

<div class="text-container">

    <p>Books and electronic media on noh, in both Japanese and Western languages, have generally categorized their content according to the five-play system (<em>goban-date</em>) that noh troupes long ago adopted in their ordering of formal full-day programs: 1) “god-plays”, 2) “warrior-plays”, 3) “wig-plays” (or “third-category plays”), 4) “miscellaneous” or “fourth-category-plays” and 5) “demon plays” or “finale-plays”. These categories are not very precise. Not all the so-called demon plays are actually about demons. Some are about lower-ranking gods (maybe “daemon” would be a better way to translate the Japanese term) and although the “wig plays” are mostly focused on women, with actors in wigs, not all plays focused on women (even wearing wigs) are categorized as wig plays (and the main actor often wears a wig in other kinds of plays too). “Fourth-category plays are also called “miscellaneous plays,” judiciously allowing a catch-all group for plays that don’t comfortably fit anywhere else. </p>
    <p>
    <em>Hashitomi</em> is a wig play and <em>Kokaji</em> is generally considered a demon play or “fifth-category play, but in some cases it is considered a “fourth-category play.” The central figure in <em>Kokaji</em> is actually a god (or daemon) rather than a demon proper, which may account for its occasional placement in the fourth category.</p>
    <p>
For all these inconsistencies, though, the goban-date system has had a productive role in structuring occasions of performance, dating back into the seventeenth century, if not earlier. But this was still not the earliest way of categorizing the repertory of noh, or as it was known then, “sarugaku.” In the late fourteenth century, a somewhat different typology existed, at least in the writings of Zeami (1363-1443), with gods, women, warriors and demons, to be sure, but also the deranged (in most cases, women), priests, Chinese “types”, and “roles in which the main character doesn’t wear a mask.” Perhaps that was simply the way this most prominent noh actor in all the history of noh thought about categories of sarugaku performance. But even Zeami wasn’t fully committed to such a schema, since he changed to a more abstract system of “Three Modes” (Old Man, Warrior, and Woman) in the latter decades of his life. </p><p>
The choice of <em>Hashitomi</em> and <em>Kokaji</em> for this site doesn’t slot neatly into either of the schemes outlined above, but for all that, it provides an instructive perspective on all of them, with ties to the historical development of sarugaku into noh as well. Before we can compare the plays in this context, though, we should look at them individually, to highlight their particular characteristics, both typical and unusual. Neither play is mentioned frequently or prominently in the historical record of noh, so much of our evidence must come internally, from the plays themselves, but that is the best way to understand their structure and content anyway. </p>
<h3 id="plays-Hashitomi"><em>Hashitomi</em> (or <em>Hajitomi</em>)</h3>
<p markdown="1">
As is often the case with noh, neither <em>Hashitomi</em> nor <em>Kokaji</em> can be confidently attributed to a particular author or composer.  One of the lists of the noh repertory compiled in the seventeenth-century claims that Zeami wrote <em>Hashitomi</em>, but this is highly unlikely. The author named in other lists of roughly the same time claims the play was written by one Naitō Saemon, or Naitō Tōzaemon, or Ninagawa; little is known about these figures apart from similar references to the authorship of two other noh plays by the said Naitō,  so perhaps he was the writer of <em>Hashitomi</em> after all.[^1] But even if we cannot be fully confident in such an identification, the question of authorship nonetheless affords us a good perspective on not only <em>Hashitomi</em> and its reception but, more broadly, on the solidification of performance conventions in noh, inter-arts comparisons and what has been termed the “folklore” of The Tale of Genji. </p><p>
The name Naitō Saemon or Tōzaemon itself suggests lineage in a military family, and is very different in character from the names of professional noh actors we can identify from the fourteenth and fifteenth century. It is likely that as a noh or sarugaku playwright, Naitō (or whoever composed <em>Hashitomi</em>) was a talented amateur, and the play bears various marks of the amateur, not just this name, as we shall see. And we should say from the start that “amateur” here is not to be taken negatively. </p><p>
If <em>Hashitomi</em> bears a number of hallmarks of amateur composition, this makes it even more amenable to the identification of general characteristics of wig plays, even as it illustrates the historical development of noh in the fifteenth century more clearly than some of the more celebrated and intricately constructed plays of professionals like Zeami.</p><p>
The central character of <em>Hashitomi</em>, for instance, is not readily identifiable. She bears certain associations with the famous Lady of the Evening Faces, Yūgao no Ue, in The Tale of Genji, but she could also be understood to be the spirit of the so-called yūgao plant, a type of bottle gourd with a white blossom. Such a spread of associations comes about primarily because of the choice of poems and other passages from Genji quoted, and sometimes altered, in the play.</p>
<p markdown="1">The quotations in question come from a variety of contexts in Genji. One is a sophisticated comparison between the moon and a departing lover, figuring the lady who longs for him on his departure to the mountain horizon. [^2] Another requests that pinks (or dianthus flowers) deign to cast a thought, in the form of a dewdrop, onto the stakes of a dilapidated fence: this is an elaborate metaphor asking a highborn lord to look in upon his little daughter, even though her now dead mother was of undistinguished rank. [^3] Both of these allude to important plot points early in the narrative of Genji, in connection with the ill-fated Lady of the Evening Faces, but both need the context of the tale itself to fill out the incidents in question. That, though, does not seem to be what the writer of <em>Hashitomi</em> intended. And yet, he was not just a magpie, picking up a snatch of poem here and a snatch of poem there. He was aiming for a different kind of sophisticated effect, if we are to judge from his use of a third poem taken from Genji. This poem appears in the play at the most conspicuous place possible, right after the shite’s jonomai at the play’s climax. Or, to be more precise, we should say that the poem sandwiches the dance, because the first line of it (altered in an interesting way) comes before the dance and then, once the dance is finished, the full poem is sung.
In Genji, too, the poem in question comes at a crucial place; there, it serves as the pivot from simple curiosity to a fatal romantic encounter. The poem reads:
</p>


<table class="content-table">
<tr class="content-table__row">
          <td id="hashitomi-first-act" class="content-table__column">
                          <em>Yorite koso sore ka to mo mime tasokare ni</em><br>
                           <em>honobono mitsuru hana no yūgao </em></td>
</tr>
<tr class="content-table__row"></tr>

<tr class="content-table__row">

            <td class="content-table__column">Who is it, in the deepening dusk?<br>
            Only by going up close might you see just who —<br>
            the white gourd blossom <br>
            fading out of view.</td>

</tr>
</table>
<p>
In Genji, this poem comes in response to another poem, on a slip of paper attached to a real <em>yūgao blossom</em>:</p>

<table class="content-table">
<tr class="content-table__row">
          <td id="hashitomi-first-act" class="content-table__column">
          <em>Kokoro-ate ni sore ka to zo miru shiratsuyu no</em><br>
           <em>hikari soetaru yūgao no hana</em></td>
</tr>
<tr class="content-table__row"></tr>

<tr class="content-table__row">

            <td class="content-table__column">
            Venturing a guess, <br>
            it looks to me just like “the very one”:<br>
            light suffuses the white dewdrops<br>
            on the blossoms of white gourd.
            </td>

</tr>
</table>

<p>
This episode in Genji is one of its most characteristic, pairing an elite teenage male, a player in the erotic competition of the classical romance, with a beauty bereft of the political and social connections needed to maintain her position, any position, in the society of the novel.  The initial vector for contact is classical poetry, ostensibly about flowers, and these two poems allow the two lovers-to-be to break the ice and thus to further the plot of the novel.  The hidden female speaker of <em>kokoro-ate ni</em> is hinting that she understands it is the Shining Prince, Genji himself that passes by her cottage, with its <em>yūgao</em> flowers, and Genji, in his response, begs an invitation to get a closer look.
</p><p>
The poems also draw on a broader cultural matrix, that of an idealized classical culture of the royal court. In addition to the figural use of the gourd blossom, which links the Lady of the Evening Faces with Genji, the cultural associations of the flower, as codified and thematized in the practice of court poetry, create a rich world of associations. They also set this world in soft focus, by ambiguity and interpretive polyvalency. The word <em>tasogare</em>, “dusk”, for instance, provides the mise-en-scène for the gourd to blossom — it blooms at nightfall, and each blossom perdures for but a single night.  This foreshadows the brevity of a tragically brief love affair at its very inception.  It also impresses the time with an emotional character: if <em>tasogare</em> is dusk, it is the time when one begins to fail to recognize passers-by. Indeed, <em>ta so gare</em> (or <em>kare</em>)” in ancient Japanese means “Who is that?”
</p><p>
This grounding of the poem is used to specific ends in the novel, but when we consider the use of this and other poems from the classical tradition in <em>Hashitomi</em>, we find that those are not necessarily the same ends.
</p><p>
There is, for instance, a crucial single-syllable change in the way the play quotes the Genji verse. Instead of <em>yorite koso</em>, “Only by going up close”, the play reads <em>orite koso</em>, which means “only by breaking/snapping off”.  That could probably be construed to mean “take someone captive, romantically (or abusively),” but it is much more prominently a word used of gathering sprigs or branches of flowers in bloom. This interpretation fits easily into the general aesthetic context of <em>Hashitomi</em>, which is occasioned, according to the words of the waki in the beginning of the play, by a Buddhist service propitiating the flowers that adorn ritual altars (the <em>rikka kuyō</em>). With this reference, the play alludes to an intellectual debate popular in medieval Japan in which the boundaries of sentiency, and thus, of the potential for enlightenment or salvation, were disputed. The debate is not fully articulated in the play, but it’s clear enough that the composer felt plants and trees were sentient beings, and deserving of reverence. In this, he was of the same opinion, apparently, as a number of other noh playwrights, including the most celebrated.
</p><p>
With this, then, we begin to see <em>Hashitomi</em> in a somewhat broader context than merely that of an elegant tableau vivant lifted from an old tale. It then reveals links not only to Buddhist thought about the natural world, but also to an important inter-arts connection with the art of flower arranging.
</p><p>
This connection is, in fact, given material expression as the raison d’être for a variant performance style for the play, in all <a href="/music/voices/" target="_blank">five modern schools</a>. That variant style, or <em>kogaki</em> specifies a particular prop that is not used in more conventional performances. The prop is a very large, very formal flower arrangement in an ancient style called <em>rikka</em> or “standing flowers”, quoted directly from Buddhist antecedents. This arrangement is stationed center-stage for the first part of the play when it is performed according to this variant, and it adds a beautiful and conspicuous supplement to the already heavily floral character of the play.
</p><p>
There isn’t a clear documentary trail that would tell us when the play was first done in this manner, but in that it straddles the worlds of noh performance and flower arranging, it points to the aesthetic cultivation of a time when amateurs could compose noh plays, and have them performed, and integrate them with other overt expressions to their cultural capital and inter-arts sophistication. And it is not merely in the context of noh and flower arranging that we can see this in examining <em>Hashitomi</em>.  In addition, we can reconsider the way the play deploys the several classical Japanese poems it quotes. If they are not used to reimagine a scene from classic literature (as other famous noh plays such as Izutsu or Atsumori do), they are nonetheless taken from self-conscious and serious aesthetic aspirations. If the poems in question don’t all come from a particular narrative context in Genji, they nonetheless share a common theme. The poem I mentioned earlier, about “the pinks . . .  casting a thought, in the form of a dewdrop, onto the stakes of a dilapidated fence,” though not from the “Lady of the Evening Faces” episode in Genji,  nonetheless comes from a foreshadowing of that episode in the previous chapter of the tale. It seems very likely — and here we would follow Janet Goff in her fine study of noh based on Genji — that the composer of <em>Hashitomi</em> might have discovered his thematic material for the play in the handbooks created for practitioners of linked verse (many of them amateurs), where appropriate tags from classical poetry and narrative, were collected and arranged topically for the use of latter-age versifiers.
</p><p markdown="1">
One of the best known of those handbooks, Renju gappekishū, indeed, quotes the two poems from the encounter in Genji with the same variant first line of the response poem, <em>orite koso</em>, that is cited in <em>Hashitomi</em>. [^4]
</p><p>
One sees a similar propensity to playing a game of poetic allusion in some of the Chinese verses quoted in <em>Hashitomi</em>. Those verses come mostly from a collection of both Chinese and Japanese verse put together in the eleventh century, Wakan rōeishū, and seem less successfully integrated into the play than the Genji verses. All the same, they point to the same propensity for canvassing a broad inter-arts spectrum in order to compose the play.
</p><p>
The title <em>Hashitomi</em> (or <em>Hajitomi</em>) has not been the exclusive title of this play in such documentation as exists since the <strong>*s</strong>eventeenth century. It has occasionally been known as Yūgao or Yūgao no Ue, provoking some confusion because there is another play of the same name in the repertory. Modern scholarly consensus has distinguished the two plays, leaving the other with the name Yūgao, pointing as well to the latter play’s more consistent and narrative-oriented use of source poems from The Tale of Genji. For this reason, the possibility has been mooted that that play was created by Zeami or at least by someone faithful to the guidelines he articulated.
</p><p>
That said, though, one can still identify in <em>Hashitomi</em> many of those same guidelines: the use of familiar poems from old classics is itself something Zeami recommended, and the focus on dance, with the fully orthodox <a href="/catalog-of-shodan/jonomai/" target="_blank"<em>jonomai</em></a> of the final act sandwiched between lines from the central poem in the play is a common feature of many of the classic plays in the repertory. (And although the professional actors and playwrights of the fifteenth century cannot be directly credited with the <em>jonomai</em>, they do seem to have deployed its ancestor, the <em>tennyo no mai</em> as early as the 1420s.*)
</p><p>
From this perspective, <em>Hashitomi</em> differs considerably from <em>Kokaji</em>. Although we have even less information on who composed <em>Kokaji</em> than <em>Hashitomi</em>, and although we have no documentary evidence to show that it is an old play (of, say, the late fourteenth or early fifteenth century). It nonetheless represents an older approach to noh, or sarugaku performance, than <em>Hashitomi</em>, in that it is a miracle play: the claims of sarugaku tradition hold that it originated in the miraculous manifestation of a native deity at the foot of a pine tree, the Pine of Divine Revelation (<em>yōgō no matsu</em>) in the ancient capital Nara. Many of the oldest plays in the repertory show features of this legend. Some of them are classed as god plays according to the <em>goban-date</em> system I mentioned at the beginning of this essay. Others, though, often more interesting, are plays such as <em>Kokaji</em>, which fall into the final category, the so-called “demon” plays. The shite in <em>Kokaji</em>, however, is no demon, but rather the god Inari Myōjin, whose avatar is a fox.
</p>
<h3 id="plays-<em>Kokaji</em>"><em>Kokaji</em></h3>
<p>
Something that often distinguishes “god plays” from “demon plays” in the five-genre system is interest. A few of the god plays are wonderful, but many others are rigidly formal and austere (not to say boring). The “demon plays” are never boring, and that is in part because of a plot. It’s not a complicated multi-layered plot usually, but there is a “completion of action” in such a plot: a task is set, as in <em>Kokaji</em>, and, despite challenging obstacles, the task is accomplished. Often, as in <em>Kokaji</em>, the accomplishment is due at least in part to the aid of a god, a very deus-ex-machina.
</p><p>
The task in <em>Kokaji</em> is the forging of a sword worthy of royal commission. The obstacle is the insistence, on the part of  the best sword smith in the land, Munechika, that he must have an equally skilled partner in order to hammer such a sword into perfection. There is no one the Munechika can call upon, so he prays to the god Inari. Then, rather abruptly, a mysterious figure (wearing the mask of a beautiful boy) calls out to him. In a session that is part coaching and part annunciation, the boy encourages Munechika to make preparations to forge the sword, doing so with recourse to Japanese proverbs and sententious Chinese verse.
</p><p>
In a long formal narrative (the <em>kuri-sashi-kuse</em> sequence), the boy recounts tales from both China and Japan, of illustrious swords. (No pressure!) Then, without more ado, he instructs Munechika to prepare the forge, both physically and ritually, only to disappear into the “evening clouds of Mt. Inari.” We can already surmise that this story is going to have a happy ending, but that doesn’t keep another actor, this time a kyōgen actor, from coming on stage as a minor local deity, to rehearse the plot once again.
</p><p>
So now to the accomplishment of the task: The plot is resolved in our minds, but the excitement of the play is really just getting off the ground, for now there is a sequence of musical pieces, some instrumental, some with chorus accompanied by the ensemble, during which the god Inari manifests himself to his human partner Munechika in forging the sword that is the focus of the miracle.  The god’s costume will be flashing metallic thread or appliqué, the mask will arrest our attention with a daemonic intensity, and above we will find a huge red wig crowned with a glittering circlet topped, in turn, with a shining image of a fox. This is what we came for, the appearance of a god, or demi-god at least.
</p><p>
The sequence of instrumental pieces that mark the last act of the play, the <em>raijo</em>, the <em>hayafue</em> and the <em>maibataraki</em>, is a tour-de-force, and marks off a special group of plays in the noh repertory as of particular excitement. These plays often bring a full day’s performance to an end. They are flashy and satisfyingly simple (to enjoy, if not to perform). They’ve been a staple of sarugaku performance since the late fourteenth-century and have their roots in the oldest identifiable traditions of the modern schools of noh.
</p>
<h3 id="plays-stars">* * * * *</h3>
<p>
With such archaic roots, miracle plays like <em>Kokaji</em> represent a kind of Ur-noh. They are discernible in the oldest traditions of the Yamato troupes that are the lineal ancestors of modern noh performance, and although <em>Kokaji</em> itself may not be that old, it is representative of an aesthetic of simple plots with definitive and felicitous conclusions. When we look back at <em>Hashitomi</em> from such a perspective, we are struck by now different it is, how the conclusion is anything but definitive — we don’t really know if the central character we’ve been watching for an hour or so is the exquisite ghost of the court of Genji or, rather, a transcendent manifestation of a gourd blossom.  She evaporates as if in a dream.
</p><p>
Her costume will be very beautiful, no doubt, and her mask perhaps virtuosically executed, but nonetheless generic. And on top of that, unlike <em>Kokaji</em>, with its two masks, <em>Hashitomi</em> requires only one. Viewers are likely as not going to be drawn to the fragile edifice of a gourd-flower arbor that is the main prop on stage in typical performances, as much as they are to the actors themselves. Or to an elaborate sculpture of blossoms that is then to be situated center stage — with the full acquiescence of the actors — for the entire first act of the play, when the play is performed in that special variant <em>rikka</em> style. You might say that the visual aesthetic of the play is diffused, like the identity of the shite, over the entire stage. In this sense, <em>Hashitomi</em> is more a play for expert members of the audience, than is <em>Kokaji</em>. As we have seen, it was likely composed by an amateur, someone interested not just in noh, but also flower arranging, someone eager to show off his knowledge of poems from The Tale of Genji, perhaps an aficionado of linked verse with a taste for Chinese learning as well.
</p><p>
All these features of <em>Hashitomi</em> make it an excellent resource for investigating the value-added aesthetic of plays written to contrast with those about gods and demons from the old Yamato tradition. These newer plays are more complex thematically and formally more self-conscious than those. They were incubated in the aesthetic world of the early to mid- fifteenth century, and exhibit an interest in mystery and subtlety, often discussed using the term <em>yūgen</em>. Although the Yamato tradition of performance lives on in <em>Hashitomi</em> as well as in <em>Kokaji</em>, it is transformed by the influence of other approaches to performance associated with the area near Lake Biwa, closer to Kyoto than the Yamato troupes, as well as by the example of mature classic plays such as Izutsu and Matsukaze.
</p><p>
That these two plays bear the hallmarks of different aesthetic, geographical and ideological strains makes them a particularly instructive pair for study.

</p>
  </div>

</main>

[^1]: The play Shunzei Tadanori, which remains in the Noh repertory, as well as the play Kodama Ukifune, which has fallen out of performance, have been attributed to Naitô.  (Goff, p. 186.)

[^2]: <em>Yama no ha no kokoro mo shirade yuku tsuki wa uwa no sora nite kage ya taenan</em><br>
      “Will the moon go off into the sky and fade from sight, all unawares of the longing heart at the mountain’s edge?“

[^3]: <em>Yamagatsu no kakiho aru to mo oriori ni aware wa kakeyo nadeshiko no tsuyu</em>
      “Though the stakes in this rustic fence are bent this way and that from time to time, allow your thoughts to settle down upon it, dewdrops on the pinks.“

[^4]: There is another variation in the Noh play from the poem as quoted in Genji. This one is less significant in that it merely changes <em>honobono mitsuru to honobono mieshi</em>. I translated the former version “fading out of view”, but a more explicit version would be something like “which one saw vaguely.” <em>Honobono mieshi</em> has less explicit agency, and could be rendered, “which appeared vaguely.”

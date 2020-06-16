---
layout: website
title: Using the Site
menu-active: about
permalink: /using-the-site/
---

<main class="page-content">
  <div class="text-container">
    <div class="wrapper wrapper--small">
      <h1>USING THE SITE</h1>

      <h2>Navigation</h2>
      <p>
        The site's <a href="https://noh.stanford.edu/">front page</a> offers an
        overview of the full contents of <i>Noh as Intermedia</i>, and most
        sections of the site are easily reachable via the drop-down menu items
        at the top of each page. Items under the <strong>Elements</strong> menu
        lead to numerous pages and sub-pages providing descriptions and examples
        of the formal design of Noh and its diverse layers.
      </p>
      <p>
        The two main links under the <strong>Plays</strong> menu launch an
        interactive interface providing an in-depth intermedia analysis
        synchronized with full-length recordings of two contrasting Noh plays.
        The two levels of this interface (one for the entire play, and one for
        each section) include a button for the <strong>Guide</strong> in the
        upper right, which highlights the main features of the interface.
      </p>

      <h2>Suggested Citations</h2>
      <h3>Citing <i>Noh as Intermedia</i></h3>
      <p>
        Fujita Takanori, Jarosław Kapuściński, François Rose. 2019.
        <i>Noh as Intermedia.</i>
        <a href="https://noh.stanford.edu/">https://noh.stanford.edu/</a>
      </p>
      <h3>Citing an essay</h3>
      <p>
        Tom Hare. 2019. &ldquo;Why Hashitomi and Kokaji?&rdquo; In
        <i>Noh as Intermedia.</i> Eds. Fujita Takanori, Jarosław Kapuściński,
        François Rose.
        <a href="https://noh.stanford.edu/plays/"
          >https://noh.stanford.edu/plays/</a
        >
      </p>
      <h3>Citing interactive content</h3>
      <p>
        Fujita Takanori, Jarosław Kapuściński, François Rose. 2019.
        &ldquo;Hashitomi: Jonomai.&rdquo; In <i>Noh as Intermedia</i>.
        <a href="https://noh.stanford.edu/hashitomi/jonomai/"
          >https://noh.stanford.edu/hashitomi/jonomai/</a
        >
      </p>

      <h2>Embedding the Videos</h2>
      <p>
        The full-length, high-definition video recordings of performances of
        <i>Kokaji</i> and <i>Hashitomi</i> may be embedded on other sites for
        the purposes of citing specific segments of the performances via our
        video player. The following embedding code should be used and modified
        as needed to play the desired section. Further information is available
        on the
        <a
          href="https://github.com/sul-cidr/noh/wiki/Level-0-HTML-components#example-link-to-open-a-popout-video-player"
          >wiki</a
        >.
      </p>

      <h3>As an embedded HTML5 &lt;video&gt; element</h3>

      <pre><code>
&lt;video&gt;
&lt;source src="http://noh.stanford.edu/popout/hashitomi/#t=01:30,1:38&amp;autoplay&amp;autoclose" type="video/mp4"&gt;
&lt;/video&gt;
      </code></pre>

      <h3>As a link to a popout video player</h3>

      <pre><code>
&lt;a href="#0" onclick="window.open('/popout/hashitomi/#t=01:30,1:38&amp;autoplay&amp;autoclose', 'new', 'width=640,height=360');return false;"&gt;Popout Link&lt;/a&gt;
      </code></pre>

      <h2>Terms of Use</h2>
      <p>
        The images, videos, and sound recordings of Noh performances on this
        site are the property of their creators and are provided here for
        scholastic purposes. We request that visitors to the site respect these
        rights and obtain proper permission before using the media elsewhere.
      </p>
      <p>
        The Stanford University
        <a href="https://www.stanford.edu/site/terms/">Terms of Use</a> apply to
        the contents of this site.
      </p>

      <h2>Source Code</h2>
      <p>
        The source code for the site is freely available under the MIT License
        at
        <a href="https://github.com/sul-cidr/noh"
          >https://github.com/sul-cidr/noh</a
        >.
      </p>
    </div>
  </div>
</main>

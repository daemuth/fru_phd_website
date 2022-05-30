<style>

  :global(html,body) {
    height: 100%;
    background-color: #181818;
  }

  :global(header,footer) {
    display: none !important;
  }

  :global(main) {
    padding: 0 0 0 0;
    margin: 0 0 0 0;
    width: 100%;
    max-width: 100% !important;
  }

  :global(article) {
    max-width: 100% !important;
    width: 100% !important;
    padding: 0 !important;
  }

  .container {
    display: flex;
    flex-direction: row;
  }

  .side-a {
    display: flex;
    flex: 1;
    flex-direction: column;
    text-align: justify;
    background-color: #1e2626;
  }

  .side-b {
    display: flex;
    flex: 1;
    align-self: stretch;
    flex-direction: column;
    background-color: #1e2626;
  }

  .fullHeight {
    height: 100vh;
    padding: 0em 2em 0em 2em;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
  }

  .sticky {
    position: sticky;
    top: 0rem;
    background-color: #1e2626;
  }

  .sticky.isStuck {
  }


  .welcome {
    height: 100vh;
    width: 100%;
  }

  #game {
    width: 100%;
    height: 100%;
    flex: 1;
  }

  .cover-picture {
    aspect-ratio: auto;
    margin: 1em;
    object-fit: scale-down;
  }

  .picture-container {
    max-height: 100vh;
    display: flex;
    align-content: center;
    justify-content: center;
    content-visibility: visible;

  }

  .picture-container img
  {
    content-visibility: visible;
  }

  .picture-container picture {
    display: flex;
    justify-content: center;
    align-content: center;
  }

  .fullwidth {
    width: 100%;
  }

  h1 {
    line-height: 2;
    text-align: center;
  }

  .left-align-text {
    align-items: normal;
  }

  p {
    text-align: justify;
  }

  .heading-container {
    background-color: #181818;
  }

  .divider
  {
    max-height: 1.5em;
    margin-top: 1em;
  }
</style>

<script>

  import {onMount, tick} from 'svelte';

  import sticky from "./sticky";
  import {SvelteComponent} from "svelte";
  import NotionText from "./NotionText.svelte";

  let isStuck = false;

  function handleStuck(e) {
    isStuck = e.detail.isStuck;
  }

  export let cards;
  let currentCard = null;
  window.UnityCardChanged = function (cardId) {
    currentCard = cards.find((card) => card["properties"]["Card ID"]["number"] == cardId)
  }


  onMount(async () => {
    await tick()

    createUnityInstance(document.querySelector("#game"), {
      dataUrl: "/game/Build/index.html.data.b",
      frameworkUrl: "/game/Build/index.html.framework.js.br",
      codeUrl: "/game/Build/index.html.wasm.br"
    });

  });

</script>

<!--Welcome-->
<section class="heading-container">
  <div class="welcome">
    <h1>Chapter 1 <br/> The Heart</h1>
    <p>You wake up on a boat. What kind of boat it is and where it’s going, you don’t know—you can only hear the sails
      catching the wind and birds calling up above, the scent of brackish water and vegetation thick in your nose. You
      wake up on a boat. Your destination is unknown; your journey, unwritten.</p>
    <p>The year is <b>1864</b>. When you stand, you see hills opening up to the mouth of a great river, sandy-brown in
      the light of the greyish dawn.</p>
  </div>
</section>

<!--Game-->
<section class="fullwidth">
  <div class="container">
    <div class="side-a">
      <div class="fullHeight sticky"
           class:isStuck
           use:sticky={{ stickToTop: true }}
           on:stuck={handleStuck}>
        {#if currentCard }
          <h2>{currentCard["properties"]["Card name"]["title"][0].plain_text}</h2>
          <NotionText rich_text={currentCard["properties"]["Description"].rich_text}/>
        {/if}
      </div>
    </div>
    <div class="side-b">
      <div id="gameContainer" class="fullHeight">
        <canvas id="game">Side B1</canvas>
      </div>
    </div>
  </div>
</section>

<!--Posters intro-->
<section class="heading-container">
  <div class="welcome">
    <h1>Chapter 2 <br/> From the Highlands to the Coast</h1>
  </div>
</section>

<!--Posters content-->
<section class="fullwidth">
  <div class="container">
    <div class="side-a">
      <div class="fullHeight">
        <h2>A Missed Destiny</h2>
        <p>Time spins forward, an unspooling of history. You are on a train going East. East of where? You don’t know.
          There is a book open in your lap, its pages earmarked by a careless hand—the writer talks of loneliness and
          isolation, but the green, towering mountains you see outside the window make you feel only peace. The
          newspaper
          on the bench next to you speaks of unrest in Europe. The year is 1922. </p>
        <img class="divider" src="/img/dividers/01.PNG"/>
      </div>
      <div class="fullHeight">
        <h2>The Unknown and the Awful</h2>
        <p>The dunes are endless, endless, endless, endless, endless, endless. What kind of secrets does the desert
          hide?
          Day turns into night, the heat of the sun giving way to punishing cold. You wonder—in the
          <em>times-before</em>,
          had people climbed these dunes to watch the same stars? What kind of secrets did they tell them? Are you
          rushing
          past too quickly to hear?</p>

        <p>The unknown and the awful always bring a man closer to his maker, the writer says. Before you, the stars are
          mute anyhow.</p>
        <img class="divider" src="/img/dividers/02.PNG"/>
      </div>
      <div class="fullHeight">
        <h2>A Universe of Ghosts </h2>
        <p>The peaks go up and up and up for miles then tumble into the sea, giants that guard the coastline. A bend on
          the tracks and you see green hills that open to reveal the mouth of a great river. A ghost. Memory unfolds
          like
          an image on collodion paper under a pool of clear alcohol.</p>
        <p>You’ve been here before. You’ve seen this scene before. The next earmarked page is wrinkled with spilled
          water.
          <em>The inextinguishable elements of individual life,</em> ink running into spiderwebs with the memory of a
          river.</p>
        <img class="divider" src="/img/dividers/01.PNG"/>
      </div>
      <div class="fullHeight">
        <h2>In the Flicker</h2>
        <p>There’s been darkness here yesterday, says the writer. You cannot figure out why. The coast stretches into
          the
          curve of the Earth, mountains like giants behind. There are people here. Life here. In the distance, you catch
          sight of the white triangle of a sail, and think—</p>
        <p>But memory is a curious thing. One moment, you’re standing on a ship and watch the sun rise above the mist.
          The
          next, there is sand under your feet, and in the distance, you hear the sound of laughter. The earmarked book
          is
          in your hands. <em>Darkness, darkness.</em></p>
        <p>You walk to the edge of the water. The waves lap gently at your feet. You slip the book into your pocket and
          close your eyes.</p>
        <img class="divider" src="/img/dividers/02.PNG"/>
      </div>
    </div>
    <div class="side-b">
      <div class="picture-container">
        <img class="cover-picture" src="/img/posters/1.jpg">
      </div>
      <div class="picture-container">
        <img class="cover-picture" src="/img/posters/2.jpg">
      </div>
      <div class="picture-container">
        <img class="cover-picture" src="/img/posters/3.jpg">
      </div>
      <div class="picture-container">
        <img class="cover-picture" src="/img/posters/4.jpg">
      </div>
    </div>
  </div>
</section>
<!--Posters content END-->

<section class="heading-container">
  <div class="welcome">
    <h1>Chapter 3 <br/> Storymaker</h1>
  </div>
</section>

<section class="fullwidth">
  <div class="container">
    <div class="side-a">
      <!-- AR 1-->
      <div class="fullHeight sticky"
           class:isStuck
           use:sticky={{ stickToTop: true }}
           on:stuck={handleStuck}>
        <p>The city arches over the desert like a graceful avian creature made of glass. Trees grow from the walls of
          buildings, and bending away from your feet is golden savannah grass.</p>
        <p>The statue in front of you is of a woman. You touch her hand.</p>
        <p>“‘<em>They’re afraid because we exist,’ she says. ‘There’s nothing we did to provoke their fear, other than
          exist. There’s nothing we can do to earn their approval, except stop existing – so we can either die like they
          want, or laugh at their cowardice and go on with our lives.’”</em></p>
        <img class="divider" src="/img/dividers/01.PNG"/>
      </div>
      <!-- AR 2-->
      <div class="fullHeight sticky"
           class:isStuck
           use:sticky={{ stickToTop: true }}
           on:stuck={handleStuck}>
        <p>You walk to a nook at the edge of the city. Underneath you, the sand is like an ocean: silver and blue waves
          crash against the curve of the horizon, and the wind smells like warm concrete and salt and eucalyptus.</p>
        <p>You lean on the railing, close your eyes, and listen.</p>
        <img class="divider" src="/img/dividers/02.PNG"/>
      </div>
      <!-- AR 3-->
      <div class="fullHeight sticky"
           class:isStuck
           use:sticky={{ stickToTop: true }}
           on:stuck={handleStuck}>
        <p>The book is still in your pocket. Earmarked. Annotated. Questioned, lost and found, with you from the mouth
          of
          the river to the domed top of this glass city with its trees and draperies and markets and the priests that
          sit
          on cushions on the corners and the laughter of children.</p>
        <p>You open the book. <em>The unseen presence of victorious corruption, the darkness of an impenetrable
          night.</em></p>
        <p>The wind picks up then. From below you comes the fluttering song of chimes. You don’t <em>mean</em> to close
          your eyes—it just happens, chest full with the memory of a ship and a train and a hundred sunrises over the
          horizon.</p>
        <p>When you open your eyes, on your palms where the book once was lies a black pearl, the size of your
          thumbnail,
          if that.</p>
        <p>You put it in your pocket, turn away from the balcony railing and follow the sound of wind chimes into the
          light.</p>
        <img class="divider" src="/img/dividers/01.PNG"/>
      </div>
    </div>
    <div class="side-b">
      <div class="picture-container">
        <img class="cover-picture" src="/img/AR/1.jpeg">
      </div>
      <div class="picture-container">
        <img class="cover-picture" src="/img/AR/2.jpeg">
      </div>
      <div class="picture-container">
        <img class="cover-picture" src="/img/AR/3.jpeg">
      </div>
    </div>
  </div>
</section>

<section class="heading-container">
  <div class="welcome left-align-text">
    <img class="divider" src="/img/dividers/02.PNG"/><br/>
    <p>Dear Reader,</p>
    <p>Thank you for playing <em>Storymaker World</em>. This game has taken you through a reimagining of the novella <i>Heart
      of Darkness—</i>sort of. Rather than an adaptation, I like to think of it as a reverse interpretation of the
      novella’s cultural footprint: the image of Africa as it lives in our Western minds influenced by narratives that
      stretch from the days of empire to now, unwound through a transmedia story.</p>
    <p>The game <b><em>Heart</em></b> makes up the origin point of this temporal-narrative journey. This is the closest
      the story ever gets to touching its colonial inspiration. As you travelled through time into <b><em>From the
        Highlands to the Coast</em></b>, then—finally—to <b><em>Storymaker</em></b>, you have crossed a distance not
      only in time and place, but in thinking, too.</p>
    <p>The artwork and text quotes are from the following novels and from the following authors:</p>
    <p>[references]</p>
    <p>For a breakdown of each individual project and other supporting materials, please make your way to the <b>Sketchbook.</b>
    </p>
    <img class="divider" src="/img/dividers/01.PNG"/><br/>
  </div>
</section>

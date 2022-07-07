<style>

  :global(html,body) {
    height: 100%;
    background-color: #181818;
    overflow-y: hidden;
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
    display:grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    height: 100%;
    min-height: 100vh;
    max-height: 100vh;
  }

  .side-a {
    display: flex;
    background-color: #1e2626;
    flex-grow: 1;
    flex-shrink: 0;
  }

  .side-b {
    display: flex;
    background-color: #1e2626;
    justify-content: center;
    align-items: center;
    flex-shrink: 1;
  }

  .fullHeight {
    padding: 0em 2em 0em 2em;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
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
    display: flex;
    align-content: center;
    justify-content: center;
    content-visibility: visible;
  }

  .picture-container img {
    content-visibility: visible;
    max-height: 90vh;
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
    margin: 1em;
  }

  .heading-container {
    background-color: #181818;
    height: 100%;
    min-height: 100vh;
    max-height: 100vh;
  }

  .divider {
    max-height: 1.5em;
    margin-top: 2em;
  }

  section
  {
    min-height: 100vh;
    height: fit-content;
    background-color: #1e2626;
  }

  section > p
  {
    margin: 1em;
  }

  .subtext
  {
    font-size: smaller;
  }

  #gameContainer
  {
    height: 100%;
    flex: 1;
  }
</style>

<script>

  import {onMount, tick} from 'svelte';

  import sticky from "./sticky";
  import NotionText from "./NotionText.svelte";
  import createScrollSnap from 'scroll-snap'
  import {sineInOut, quartOut} from "svelte/easing";

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
      dataUrl: "/game/Build/index.html.data",
      frameworkUrl: "/game/Build/index.html.framework.js",
      codeUrl: "/game/Build/index.html.wasm"
    });

    const element = document.getElementById('snapContainer')

    const {bind, unbind} = createScrollSnap(element, {
      snapDestinationY: '100vh',
      timeout: 1,
      duration: 200,
      threshold: 0.1,
      snapStop: false,
      easing: sineInOut
    }, () => console.log('element snapped'))

  });

</script>

<div id="snapContainer">

  <!--Welcome-->
  <section class="heading-container">
    <div class="welcome">
      <h1>Storymaker World <br/> The Journey</h1>
      <p>The following page is an interactive exhibition that contains a <strong>game,</strong> a <strong>gallery of posters</strong> and a <strong>gallery of Augmented Reality (AR) illustrations.</strong> For the best viewing experience, please use your browser on your computer or laptop. </p>
      <p>To view the AR illustration gallery fully, please download the Artivive app on your <strong>mobile phone.</strong> The app can be found <strong><a href="https://play.google.com/store/apps/details?id=com.artivive&amp;hl=en_GB&amp;gl=US">here</a></strong> for Android and <a href="https://apps.apple.com/us/app/artivive/id1188737494"><strong>here</strong></a> for IOS devices. Scan each image in <em>Chapter III—Storymaker</em> using the Artivive app to see the complete illustration. </p>
      <p>If you are having trouble with the app, you can also find the animated versions of the illustrations <a href="https://drive.google.com/drive/folders/1B3mJp44gRlXGYpiYQPeU7Ztu4JsjsRLX">here</a>.</p>
    </div>
  </section>

  <!--Chapter 1-->
  <section class="heading-container">
    <div class="welcome">
      <h1>Chapter 1.<br/> The Heart</h1>
      <p>You wake up on a boat. Where the boat it’s going, you don’t know—you can only hear the sails catching the wind and birds calling up above, the scent of brackish water and vegetation thick in your nose. You wake up on a boat. Your destination is unknown; your journey, unwritten.</p>
      <p>The year is <strong>1864</strong>. When you stand, you see hills opening up to the mouth of a great river, sandy-brown in the light of the greyish dawn.</p>
      <img class="divider" src="/img/dividers/01.PNG"/>
    </div>
  </section>

  <!--Game-->
  <section class="fullwidth">
    <div class="container">
      <div class="side-a">
        <div class="fullHeight">
          {#if currentCard }
            <h2>{currentCard["properties"]["Card name"]["title"][0].plain_text}</h2>
            <NotionText rich_text={currentCard["properties"]["Description"].rich_text}/>
          {/if}
        </div>
      </div>
      <div class="side-b">
        <div class="fullHeight" id="gameContainer">
          <canvas id="game">Side B1</canvas>
        </div>
      </div>
    </div>
  </section>

  <!--Posters intro-->
  <section class="heading-container">
    <div class="welcome">
      <h1>Chapter 2.<br/> From the Highlands to the Coast</h1>
      <p>Time spins forward, an unspooling of history. You are on a train going East. East of where? You don’t know. There is a book open in your lap, its pages earmarked by a careless hand. The newspaper on the bench next to you speaks of unrest in Europe. The year is <strong>1922</strong>. </p>
      <img class="divider" src="/img/dividers/01.PNG"/>
    </div>
  </section>

  <!-- First poster -->
  <section class="fullwidth">
    <div class="container">
      <div class="side-a">
        <div class="fullHeight">
          <h2>A Missed Destiny</h2>
          <p>A thin fog sits over the valley; and on either side, mountains tower like the spinal column of a creature, asleep. The writer talks of loneliness and isolation. You wonder why: as the train snakes between the peaks and into the fog, a sense of familiarity settles over you. Welcome home, safe travels. </p>
          <p class="subtext">Pictured: An illustrated representation of the Ethiopian Highlands. The quote reads, <em>“I couldn&#39;t have felt more of lonely desolation somehow</em>, <em>had I been robbed of a belief or had missed my destiny in life…”</em> (Conrad, <em>Heart of Darkness)</em></p>
        </div>

      </div>
      <div class="side-b">
        <div class="picture-container">
          <img class="cover-picture" src="/img/posters/1.jpg">
        </div>
      </div>
    </div>
  </section>

  <!-- Second poster -->
  <section class="fullwidth">
    <div class="container">
      <div class="side-a">
        <div class="fullHeight">
          <h2>The Unknown and the Awful</h2>
          <p>The dunes are endless, endless, endless, endless, endless, endless. What kind of secrets does the desert
            hide?
            Day turns into night, the heat of the sun giving way to punishing cold. You wonder—in the
            <em>times-before</em>,
            had people climbed these dunes to watch the same stars? What kind of secrets did they tell them? Are you
            rushing
            past too quickly to hear?</p>

          <p>The unknown and the awful always bring a man closer to his maker, the writer says. Before you, the stars are mute anyhow.</p>
          <p class="subtext"> Pictured: An illustrated representation of the Sahara Desert. The quote reads, “Our future was so completely unknown, and I think that the unknown and the awful always bring a man nearer to his Maker.” (Haggard, King Solomon’s Mines)</p>
        </div>
      </div>
      <div class="side-b">
        <div class="picture-container">
          <img class="cover-picture" src="/img/posters/2.jpg">
        </div>
      </div>
    </div>
  </section>

  <!--  Third poster -->
  <section class="fullwidth">
    <div class="container">
      <div class="side-a">
        <div class="fullHeight">
          <h2>A Universe of Ghosts </h2>
          <p>The peaks go up and up and up for miles then tumble into the sea, giants that guard the coastline. A bend
            on
            the tracks and you see green hills that open to reveal the mouth of a great river. A ghost. Memory unfolds
            like
            an image on collodion paper under a pool of clear alcohol.</p>
          <p>You’ve been here before. You’ve seen this scene before. The next earmarked page is wrinkled with spilled
            water.
            <em>The inextinguishable elements of individual life,</em> ink running into spiderwebs with the memory of a
            river.</p>
          <p class="subtext">Pictured: An illustrated representation of the coast of South Africa. The quote reads, “Truly the universe is full of ghosts, not sheeted churchyard spectres, but the inextinguishable elements of individual life.” (Haggard, King Solomon’s Mines)</p>
        </div>
      </div>
      <div class="side-b">
        <div class="picture-container">
          <img class="cover-picture" src="/img/posters/3.jpg">
        </div>
      </div>
    </div>
  </section>

  <!--  Fourth poster -->
  <section class="fullwidth">
    <div class="container">
      <div class="side-a">
        <div class="fullHeight">
          <h2>In the Flicker</h2>
          <p>There’s been darkness here yesterday, says the writer. You cannot figure out why. The coast stretches into
            the
            curve of the Earth, mountains like giants behind. There are people here. Life here. In the distance, you
            catch
            sight of the white triangle of a sail, and think—</p>
          <p>But memory is a curious thing. One moment, you’re standing on a ship and watch the sun rise above the mist.
            The
            next, there is sand under your feet, and in the distance, you hear the sound of laughter. The earmarked book
            is
            in your hands. <em>Darkness, darkness.</em></p>
          <p>You walk to the edge of the water. The waves lap gently at your feet. You slip the book into your pocket
            and
            close your eyes.</p>
          <p class="subtext">Pictured: An illustration of  Nigerian women reclining by the seaside. The quote reads, “We live in the flicker—may it last as long as the old earth keeps rolling! But darkness was here yesterday.” (Conrad, Heart of Darkness)</p>
        </div>
      </div>
      <div class="side-b">
        <div class="picture-container">
          <img class="cover-picture" src="/img/posters/4.jpg">
        </div>
      </div>
    </div>
  </section>

  <!--Posters content END-->

  <section class="heading-container">
    <div class="welcome">
      <h1>Chapter 3. <br/> Storymaker</h1>
      <p>You wake up. You are in a room made of glass. You wake up. You are standing knee-deep in water, the river yellow and heavy with sediment. You wake up. A screen in front of you tells you the year—the article talks about species preservation and a conservatory that flies over the desert, it talks about living dreams and people touching the stars. You’re back, the city says, and you open the door.  </p>
      <img class="divider" src="/img/dividers/01.PNG"/>
    </div>
  </section>

  <!-- AR 1-->
  <section class="fullwidth">
    <div class="container">
      <div class="side-a">
        <div class="fullHeight">
          <p>The city arches over the desert like a graceful avian creature made of glass. Trees grow from the walls of
            buildings, and bending away from your feet is golden savannah grass.</p>
          <p>The statue in front of you is of a woman. You touch her hand.</p>
          <p>“‘<em>They’re afraid because we exist,’ she says. ‘There’s nothing we did to provoke their fear, other than
            exist. There’s nothing we can do to earn their approval, except stop existing – so we can either die like
            they
            want, or laugh at their cowardice and go on with our lives.’”</em></p>
        </div>
      </div>
      <div class="side-b">
        <div class="picture-container">
          <img class="cover-picture" src="/img/AR/1.jpeg">
        </div>
      </div>
    </div>
  </section>

  <!-- AR 2-->
  <section class="fullwidth">
    <div class="container">
      <div class="side-a">
        <div class="fullHeight">
          <p>You walk to a nook at the edge of the city. Underneath you, the sand is like an ocean: silver and blue
            waves
            crash against the curve of the horizon, and the wind smells like warm concrete and salt and eucalyptus.</p>
          <p>You lean on the railing, close your eyes, and listen.</p>
        </div>
      </div>
      <div class="side-b">
        <div class="picture-container">
          <img class="cover-picture" src="/img/AR/2.jpeg">
        </div>
      </div>
    </div>
  </section>

  <!-- AR 3-->
  <section class="fullwidth">
    <div class="container">
      <div class="side-a">
        <div class="fullHeight">
          <p>The book is still in your pocket. Earmarked. Annotated. Questioned, lost and found, with you from the mouth
            of
            the river to the domed top of this glass city with its trees and draperies and markets and the priests that
            sit
            on cushions on the corners and the laughter of children.</p>
          <p>You open the book. <em>The unseen presence of victorious corruption, the darkness of an impenetrable
            night.</em></p>
          <p>The wind picks up then. From below you comes the fluttering song of chimes. You don’t <em>mean</em> to
            close
            your eyes—it just happens, chest full with the memory of a ship and a train and a hundred sunrises over the
            horizon.</p>
          <p>When you open your eyes, on your palms where the book once was lies a black pearl, the size of your
            thumbnail,
            if that.</p>
          <p>You put it in your pocket, turn away from the balcony railing and follow the sound of wind chimes into the
            light.</p>
        </div>
      </div>
      <div class="side-b">
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
      <p>Thank you for playing <em>Storymaker World</em>. This game has taken you through a reimagining of the novella
        <i>Heart
          of Darkness—</i>sort of. Rather than an adaptation, I like to think of it as a reverse interpretation of the
        novella’s cultural footprint: the image of Africa as it lives in our Western minds influenced by narratives that
        stretch from the days of empire to now, unwound through a transmedia story.</p>
      <p>The game <b><em>Heart</em></b> makes up the origin point of this temporal-narrative journey. This is the
        closest
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
</div>


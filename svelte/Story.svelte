<style>


  :global(html,body) {
    height: 100%;
    scroll-snap-type: y mandatory;
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
    align-items: stretch;
    flex-direction: column;
    scroll-snap-type: y mandatory;

  }

  .side-b {
    display: flex;
    flex: 1;
    align-self: stretch;
    flex-direction: column;
    scroll-snap-type: y mandatory;
    scroll-snap-align: start;
  }

  .fullHeight {
    height: 100vh;
    scroll-snap-align: start;
    padding: 0em 2em 0em 2em;
  }

  .test2 {
    height: 100vh;
    top: 0;
    scroll-snap-type: y mandatory;
    scroll-snap-align: start;
    background-color: #533B4C;
  }


  .sticky {
    position: sticky;
    top: 0rem;
    background-color: #533B4C;
  }

  .sticky.isStuck {
  }

  .double {
    height: 200vh;
  }

  .triple {
    height: 300vh;
  }
  .welcome
  {
    height:100vh;
    width: 100%;
    scroll-snap-align: start;

  }

  #game
  {
    width: 100%;
    height: 100%;
    flex:1;
  }
</style>

<script>

  import { onMount, tick } from 'svelte';

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
    console.log(currentCard)
  }


  onMount(async () => {
    await tick()

    createUnityInstance(document.querySelector("#game"), {
      dataUrl: "/game/Build/index.html.data",
      frameworkUrl: "/game/Build/index.html.framework.js",
      codeUrl: "/game/Build/index.html.wasm"
    });

  });

</script>
<section>
  <div class="welcome">
    <h1>Title</h1>
    <p>Description</p>
  </div>
</section>
<div class="container">
  <div class="side-a">
    <div class="fullHeight sticky"
         class:isStuck
         use:sticky={{ stickToTop: true }}
         on:stuck={handleStuck}>
      {#if !currentCard}
      <h2>Game</h2>
      <p>Game description</p>
      {/if}
      {#if currentCard }
        <h2>{currentCard["properties"]["Card name"]["title"][0].plain_text}</h2>
        <NotionText rich_text={currentCard["properties"]["Description"].rich_text}/>
      {/if}
    </div>
    <div class="fullHeight double sticky"
         class:isStuck
         use:sticky={{ stickToTop: true }}
         on:stuck={handleStuck}>
      <h2>Poster</h2>
      <p>Poster Description</p>
    </div>
    <div class="fullHeight sticky"
         class:isStuck
         use:sticky={{ stickToTop: true }}
         on:stuck={handleStuck}>
      <h2>AR</h2>
      <p>AR description</p>
    </div>
    <div class="fullHeight sticky"
         class:isStuck
         use:sticky={{ stickToTop: true }}
         on:stuck={handleStuck}>
      <h2>Extra content title</h2>
      <p>Extra content</p>
    </div>
  </div>
  <div class="side-b">
   <div id="gameContainer" class="test2">
    <canvas id="game">Side B1</canvas>
   </div>

    <div class="test2">
      <p>Poster1 content</p>
    </div>
    <div class="test2">
      <p>Poster2 content</p>
    </div>
    <div class="test2">
      <p>AR content</p>
    </div>
    <div class="test2">
      <p>Extra content content</p>
    </div>
  </div>
</div>

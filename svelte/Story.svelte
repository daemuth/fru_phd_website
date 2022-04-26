<style>
  :global(html,body) {
    height: 100%;
    scroll-snap-type: y mandatory;
  }

  :global(header,footer)
  {
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
    background: lightblue;
    align-items: stretch;
    flex-direction: column;
    scroll-snap-type: y mandatory;
  }

  .side-b {
    display: flex;
    flex: 1;
    background: lightseagreen;
    align-self: stretch;
    flex-direction: column;
  }

  .test {
    height: 100vh;
    scroll-snap-align: start;
  }

  .test2
  {
    height: 100vh;
    position: sticky;
    top: 0;
  }

  .test3
  {
    height: 100vh;
    position: sticky;
    top: 100vh;
  }
</style>

<script>
  export let cards;
  let currentCard = null;
  window.UnityCardChanged = function(cardId)
  {
    currentCard = cards.find((card) => card["properties"]["Card ID"]["number"] == cardId)
  }
  var unityInstance = UnityLoader.instantiate("game", "/game/Build/index.html.json", {onProgress: UnityProgress});

</script>

<div class="container">
  <div class="side-a">
    <div class="test">
      {#if currentCard}
        <h1>{currentCard["properties"]["Card name"]["title"][0].plain_text}</h1>
        <p>{currentCard["properties"]["Description"]["rich_text"][0].plain_text}</p>
      {/if}
    </div>
    <div class="test">Side A 2</div>
    <div class="test">Side A 3</div>
    <div class="test">Side A 4</div>
  </div>
  <div class="side-b">
    <div id="game" class="test2">Side B 1</div>
    <div class="test3">Side B 2</div>
  </div>
</div>

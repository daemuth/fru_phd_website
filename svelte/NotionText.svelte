<script>
  export let rich_text;

</script>

<p>
{#each rich_text as currentText}
  {@debug currentText}
  {#if currentText.href} <a href={currentText.href}>
  <span class:strikethrough={currentText.annotations.strikethrough}
        class:underline={currentText.annotations.underline}
        class:bold={currentText.annotations.bold}
        class:italic={currentText.annotations.italic}>
      {currentText.plain_text}
  </span>
  </a>
  {:else}
      <span class:strikethrough={currentText.annotations.strikethrough}
            class:underline={currentText.annotations.underline}
            class:bold={currentText.annotations.bold}
            class:italic={currentText.annotations.italic}>
      {currentText.plain_text}
  </span>
  {/if}
{/each}
</p>

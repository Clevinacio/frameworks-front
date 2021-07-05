<script>
  import { createEventDispatcher } from "svelte";

  export let opcoes;
  const dispatch = createEventDispatcher();
</script>

<div class="options">
  {#each opcoes as opcao, index (opcao)}
    <button on:click={dispatch("click", index)}>
      {opcao.opcao}
    </button>
  {/each}
</div>

<style lang="scss">
  .options {
    margin: 30px auto;
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      font-family: "Poppins", sans-serif;
      max-width: 120px;
      height: 30px;
      padding: 0px 30px;
      margin-left: 5px;
      margin-right: 5px;
      color: rgb(234, 246, 255);
      background: #ff3e00;
      border: 0;
      border-radius: 8px;
      cursor: pointer;

      transition: filter 0.2s;

      &:hover {
        filter: brightness(0.9);
      }
    }
  }
</style>

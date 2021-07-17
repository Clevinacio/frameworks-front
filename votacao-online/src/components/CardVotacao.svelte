<script>
  import Cabine from "./Cabine.svelte";
  import Resultado from "./Resultado.svelte";

  export let pergunta = "Nova pergunta";
  export let opcoes = [
    {
      opcao: "Sim",
      count: 6,
    },
    {
      opcao: "Não",
      count: 5,
    },
    {
      opcao: "Talvez",
      count: 3,
    },
  ];

  export let mode = "open";

  function votar(event) {
    opcoes[event.detail].count += 1;
    mode = "closed";
  }
</script>

<div class="container">
  <div class="question">
    <h2>{pergunta}</h2>
  </div>
  {#if mode === "open"}
    <div>
      <Cabine {opcoes} on:click={votar} />
    </div>
  {:else}
    <div>
      <Resultado {opcoes} />
    </div>
  {/if}
</div>

<style lang="scss">
  .container {
    margin: 100px auto;

    background: #ff9d7d;
    display: flex;
    flex-direction: column;
    max-width: 400px;
    height: 60vh;
    border-radius: 8px;
    box-shadow: 1 3px 12px rgba(0, 0, 0, 0.233);
  }

  .question {
    display: flex;
    text-align: center;

    h2 {
      font-family: "Poppins", sans-serif;
      font-weight: 700;
      width: 100%;
      color: #fff;
      margin: 20px;
      align-self: center;
    }
  }
</style>

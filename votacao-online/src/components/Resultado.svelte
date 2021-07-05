<script>
  export let opcoes;
  export let totalVotos;
</script>

<div>
  {#each opcoes as opcao, index (index)}
    <p>
      {index + 1}. {opcao.opcao} - {opcao.count} votos ({parseInt(
        (opcao.count / totalVotos) * 100
      )}%)
    </p>
  {/each}
</div>

<style lang="scss">
  div {
    margin: 0 50px;
    p {
      font-size: 18px;
      font-weight: 500;
      font-family: "Roboto", sans-serif;
      color: #f0f0f0;
    }
  }
</style>

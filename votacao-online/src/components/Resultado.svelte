<script>
  export let opcoes;
  export let color = "#fff";

  let totalVotos = 0;
  function total() {
    opcoes.forEach((opcao) => {
      totalVotos += opcao.count;
    });
    return totalVotos;
  }
</script>

<div>
  {#each opcoes as opcao, index (index)}
    <p style="color: {color}">
      {index + 1}. {opcao.opcao} - {opcao.count} votos ({parseInt(
        (opcao.count / total()) * 100
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
    }
  }
</style>

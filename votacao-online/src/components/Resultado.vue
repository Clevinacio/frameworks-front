<template>
  <div class="result">
    <p v-for="(opcao, index) in opcoes" :key="opcao">
      {{ index + 1 }}. {{ opcao.opcao }} - {{ opcao.count }} votos ({{
        parseInt((opcao.count / totalCount) * 100)
      }}%)
    </p>
  </div>
</template>
<script>
export default {
  props: ["opcoes", "totalCount"],
};
</script>
<style lang="scss">
.result {
  margin: 0 50px;
  p {
    font-size: 18px;
    font-weight: 500;
    font-family: "Roboto", sans-serif;
    color: #2c3e50;
  }
}
</style>
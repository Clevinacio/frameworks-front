<template>
  <div class="container">
    <div class="question">
      <h2>{{ pergunta }}</h2>
    </div>

    <div v-if="mode === 'open'">
      <Cabine :opcoes="opcoes" @votar="resultado"> </Cabine>
    </div>

    <div v-else>
      <Resultado :opcoes="opcoes" :totalCount="totalVotes"></Resultado>
    </div>
  </div>
</template>
<script>
import Cabine from "./Cabine";
import Resultado from "./Resultado";

const opcoes = [
  {
    opcao: "Sim",
    count: 3,
  },
  {
    opcao: "Não",
    count: 7,
  },
  {
    opcao: "Talvez",
    count: 2,
  },
];

export default {
  components: {
    Cabine,
    Resultado,
  },
  data: () => ({
    pergunta: "Teste de pergunta Vue",
    mode: "open",
    totalVotes: 0,
  }),
  methods: {
    resultado(index) {
      this.opcoes[index].count += 1;
      this.opcoes.forEach((opcao) => {
        this.totalVotes += opcao.count;
      });
      this.mode = "closed";
    },
  },
  computed: {
    opcoes() {
      return opcoes;
    },
  },
};
</script>

<style lang="scss">
.container {
  margin: 100px auto;

  background: rgb(150, 221, 197);
  display: flex;
  flex-direction: column;
  max-width: 400px;
  height: 40vh;
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
    color: #2c3e50;
    align-self: center;
  }
}
</style>
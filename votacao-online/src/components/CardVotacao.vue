/* eslint-disable vue/no-mutating-props */
<template>
  <div class="container">
    <div class="question">
      <h2>{{ pergunta }}</h2>
    </div>

    <div v-if="newMode === 'open'">
      <Cabine :opcoes="opcoes" @votar="resultado"> </Cabine>
    </div>

    <div v-else>
      <Resultado :opcoes="opcoes" :totalCount="getTotalVotos"></Resultado>
    </div>
  </div>
</template>
<script>
import Cabine from "./Cabine";
import Resultado from "./Resultado";
import { ref } from "vue";

const opcoesDefault = [
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
  props: {
    pergunta: {
      type: String,
      default: "Teste de pergunta Vue",
    },
    opcoes: {
      type: Array,
      default: opcoesDefault,
    },
    mode: {
      type: String,
      default: "open",
    },
  },
  setup(props) {
    const newMode = ref(props.mode);
    const opcoesVotacao = [...props.opcoes];

    const resultado = (index) => {
      opcoesVotacao[index].count += 1;
      newMode.value = "closed";
    };

    return { newMode, resultado, opcoesVotacao };
  },
  computed: {
    getTotalVotos() {
      let totalVotes = 0;
      this.opcoes.forEach((opcao) => {
        totalVotes += opcao.count;
      });
      return totalVotes;
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
    margin-top: 10px;
    width: 100%;
    color: #2c3e50;
    align-self: center;
  }
}
</style>
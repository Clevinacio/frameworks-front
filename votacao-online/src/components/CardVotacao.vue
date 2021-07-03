<template>
  <div class="container">
    <div class="question">
      <h2>{{ pergunta }}</h2>
    </div>
    <div>
      <Cabine> </Cabine>
    </div>

    <!-- <ng-template>
      <div>
        <resultado [opcoes]="opcoes" [totalCount]="totalVotes"></resultado>
      </div>
    </ng-template> -->
  </div>
</template>
<script>
import Cabine from "./Cabine";
export default {
  components: {
    Cabine,
  },
  data: function () {
    return {
      pergunta: "Teste de pergunta Vue",
    };
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
    color: rgb(255, 251, 251);
    margin: 20px;
    align-self: center;
  }
}

// .content{
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   margin: 0 auto;
//   align-self: center;
//   justify-content: center;
// }
</style>
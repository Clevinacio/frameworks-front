<template>
  <div class="options">
    <button>Opção</button>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
.question {
  display: flex;
  text-align: center;

  h2 {
    font-family: "Poppins", sans-serif;
    font-weight: 700;
    width: 100%;
    color: rgb(189, 190, 190);
    margin: 20px;
    align-self: center;
  }
}

.options {
  margin: 30px auto;
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    max-width: 120px;
    height: 30px;
    padding: 0px 30px;
    margin-left: 5px;
    margin-right: 5px;
    color: rgb(234, 246, 255);
    background: rgb(22, 110, 62);
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
/* eslint-disable vue/no-mutating-props */
<template>
    <div class="container">
        <div class="question">
            <h2>{{ statement }}</h2>
        </div>

        <div v-if="newMode === 'open'">
            <Cabine :options="options" @votar="resultado"> </Cabine>
        </div>

        <div v-else>
            <Resultado :options="optionsVotacao"></Resultado>
        </div>
        <button class="button" @click="$emit('back', { statement, options })">
            Voltar
        </button>
    </div>
</template>
<script>
import Cabine from "./Cabine";
import Resultado from "./Resultado";

export default {
    components: {
        Cabine,
        Resultado,
    },
    props: {
        statement: {
            type: String,
            required: true,
        },
        options: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            newMode: "open",
            optionsVotacao: [...this.options],
        };
    },
    methods: {
        resultado(index) {
            console.log(this.optionsVotacao);
            this.optionsVotacao[index].count++;
            console.log(this.optionsVotacao[index].count);
            this.newMode = "closed";
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

.button {
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
    margin: 0 auto;
    transition: filter 0.2s;

    &:hover {
        filter: brightness(0.9);
    }
}
</style>
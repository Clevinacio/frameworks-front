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
        <button class="button" @click="$emit('back')">Voltar</button>
    </div>
</template>
<script>
import Cabine from "./Cabine";
import Resultado from "./Resultado";
import { ref } from "vue";

const opcoesDefault = [
    {
        option: "Sim",
        count: 3,
    },
    {
        option: "Não",
        count: 7,
    },
    {
        option: "Talvez",
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
            required: true,
        },
        opcoes: {
            type: Array,
            default: opcoesDefault,
        },
    },
    setup(props) {
        const newMode = ref("open");
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
            this.opcoes.forEach((option) => {
                totalVotes += option.count;
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

    transition: filter 0.2s;

    &:hover {
        filter: brightness(0.9);
    }
}
</style>
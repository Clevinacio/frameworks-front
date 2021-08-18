<template>
    <div v-if="mode === 'view'">
        <h2>Votações</h2>
        <button class="create" @click="addVote">Criar votação</button>
        <p v-for="(vote, i) in votes" :key="i">
            <b>Enunciado: </b>{{ vote.statement + " " }}
            <button class="edit" @click="editVote(i)">Editar</button> {{ " " }}
            <button class="remove" @click="removeVote(i)">Remover</button>
            {{ " " }}
            <button class="use" @click="useVote(vote, i)">Usar</button>
            <br />
            <b>Opções: </b> <br />
            <span v-for="(o, i) in vote.options" :key="i">
                {{ o }}
                <span v-if="i < vote.options.length - 1">/ </span>
            </span>
        </p>
    </div>
    <div v-if="mode === 'edit' || mode === 'add'">
        <VoteForm
            :vote="votes[current]"
            @cancel="cancelChanges"
            @update="updateChanges"
        ></VoteForm>
    </div>
    <div v-if="mode === 'use'">
        <CardVotacao
            :pergunta="votes[current].statement"
            :opcoes="options"
            @back="cancelChanges"
        />
    </div>
</template>

<script>
import VoteForm from "./VoteForm.vue";
import CardVotacao from "./CardVotacao.vue";
import { ref } from "vue";

import { votes, size, createVote, updateVote, removeVote } from "./votes";

export default {
    components: {
        VoteForm,
        CardVotacao,
    },

    setup() {
        const mode = ref("view");
        const current = ref(0);
        const options = ref([]);
        const addVote = () => {
            createVote();
            mode.value = "add";
            current.value = size.value - 1;
        };

        const editVote = (index) => {
            current.value = index;
            mode.value = "edit";
        };

        const updateChanges = (vote) => {
            updateVote(vote, current.value);
            mode.value = "view";
        };

        const cancelChanges = () => {
            if (mode.value === "add") {
                removeVote(current.value);
            }
            mode.value = "view";
        };

        const useVote = (vote, index) => {
            options.value = [];
            vote.options.forEach((o) => {
                options.value.push({
                    option: o,
                    count: 0,
                });
            });
            current.value = index;
            mode.value = "use";
        };

        return {
            mode,
            votes,
            current,
            addVote,
            editVote,
            removeVote,
            cancelChanges,
            updateChanges,
            useVote,
            options,
        };
    },
};
</script>

<style lang="scss">
.cancel {
    padding: 8px;
    border: 0px;
    border-radius: 5px;
    color: white;
    background: #93a09a;
    cursor: pointer;
    transition: filter 0.2s;

    &:hover {
        filter: brightness(0.9);
    }
}

.create {
    padding: 8px;

    border: 0px;
    border-radius: 5px;
    color: white;
    background: #3273a8;
    cursor: pointer;
    transition: filter 0.2s;

    &:hover {
        filter: brightness(0.9);
    }
}

.edit {
    padding: 8px;

    border: 0px;
    border-radius: 5px;
    color: white;
    background: #f39843;
    cursor: pointer;
    transition: filter 0.2s;

    &:hover {
        filter: brightness(0.9);
    }
}

.remove {
    padding: 8px;

    border: 0px;
    border-radius: 5px;
    color: white;
    background: #d64141;
    cursor: pointer;
    transition: filter 0.2s;

    &:hover {
        filter: brightness(0.9);
    }
}

.use {
    padding: 8px;

    border: 0px;
    border-radius: 5px;
    color: white;
    background: #32a83c;
    cursor: pointer;
    transition: filter 0.2s;

    &:hover {
        filter: brightness(0.9);
    }
}
</style>
<script>
    import FormVote from "./FormVote.svelte";
    import CardVotacao from "./CardVotacao.svelte";
    import { Button } from "sveltestrap";
    import { voteList, createVoteList } from "../votes";

    let mode = "view";
    let current = 0;
    let options = [];

    let vtList = createVoteList();

    function addVote() {
        vtList.create();
        current = $vtList.length - 1;
        mode = "add";
    }

    function editVote(index) {
        current = index;
        mode = "edit";
    }

    function removeVote(index) {
        vtList.remove(index);
    }

    function showVote(index) {
        current = index;
        $vtList[current].options.forEach((o) => {
            options.push({
                option: o,
                count: 0,
            });
        });
        mode = "show";
    }

    function updateChanges({ detail }) {
        vtList.change(detail, current);
        mode = "view";
    }

    function cancelChanges() {
        mode = "view";
    }
</script>

<div>
    {#if mode === "view"}
        <div class="containerList">
            <h2>Votações</h2>
            <Button color="primary" on:click={(e) => addVote()}
                >Criar votação</Button
            >

            {#each $vtList as vote, index}
                <p>
                    <b>Enunciado: </b>
                    {vote.statement}
                    <Button color="warning" on:click={(e) => editVote(index)}
                        >Edita</Button
                    >
                    <Button color="danger" on:click={(e) => removeVote(index)}
                        >Remove</Button
                    >
                    <Button color="success" on:click={(e) => showVote(index)}
                        >Mostrar</Button
                    >
                    <br />
                    <b>Opções: </b>
                    {#each vote.options as o, i}
                        <span>
                            {o}
                            {#if i < vote.options.length - 1}
                                <span>/ </span>
                            {/if}
                        </span>
                    {/each}
                </p>
            {/each}
        </div>
    {:else if mode === "show"}
        <CardVotacao statement={$vtList[current].statement} {options} />
    {:else}
        <div class="containerForm">
            <FormVote
                vote={$vtList[current]}
                on:cancel={cancelChanges}
                on:update={(e) => updateChanges(e)}
            />
        </div>
    {/if}
</div>

<style lang="scss">
    .containerList {
        width: 600px;
    }

    .containerForm {
        width: 300px;
    }
</style>

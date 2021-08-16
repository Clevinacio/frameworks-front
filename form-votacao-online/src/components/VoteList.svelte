<script>
    import FormVote from "./FormVote.svelte";

    let mode = "view";

    function addVote() {
        mode = "add";
    }

    function cancelChanges() {
        mode = "view";
    }
</script>

<div>
    {#if mode === "view"}
        <h2>Votações</h2>
        <button on:click={(e) => addVote()}>Criar votação</button>
    {:else}
        <FormVote on:cancel={(e) => cancelChanges()} />
    {/if}
</div>

<style lang="scss">
</style>

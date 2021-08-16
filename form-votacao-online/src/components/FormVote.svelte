<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
</script>

<div>
    <h2>Formulário</h2>

    <button on:click={(e) => dispatch("cancel")}>Cancelar</button>
</div>

<style lang="scss">
</style>

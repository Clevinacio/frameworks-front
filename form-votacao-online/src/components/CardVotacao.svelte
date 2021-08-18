<script>
    import { createEventDispatcher } from "svelte";

    import { Button } from "sveltestrap";

    import Cabine from "./Cabine.svelte";
    import Resultado from "./Resultado.svelte";

    export let statement;
    export let options;

    export let mode = "open";
    const dispatch = createEventDispatcher();

    function votar(event) {
        options[event.detail].count += 1;
        mode = "closed";
    }
</script>

<div class="container">
    <div class="question">
        <h2>{statement}</h2>
    </div>
    {#if mode === "open"}
        <div>
            <Cabine {options} on:click={votar} />
        </div>
    {:else}
        <div>
            <Resultado {options} />
        </div>
    {/if}
    <button
        class="button"
        outline
        color="warning"
        on:click={(e) => dispatch("back")}>Voltar</button
    >
</div>

<style lang="scss">
    .container {
        margin: 100px auto;

        background: #ff9d7d;
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
            width: 100%;
            color: #fff;
            margin: 20px;
            align-self: center;
        }
    }

    .button {
        font-family: "Poppins", sans-serif;
        max-width: 120px;
        height: 30px;
        padding: 0px 30px;
        margin-left: 5px;
        margin-right: 5px;
        color: rgb(234, 246, 255);
        background: #ff3e00;
        border: 0;
        border-radius: 8px;
        cursor: pointer;

        transition: filter 0.2s;

        &:hover {
            filter: brightness(0.9);
        }
    }
</style>

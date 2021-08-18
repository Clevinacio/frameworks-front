<script>
    import Cabine from "./Cabine.svelte";
    import Resultado from "./Resultado.svelte";

    export let statement;
    export let options;

    export let mode = "open";

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
</style>

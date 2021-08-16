<script>
    import VoteList from "./components/VoteList.svelte";
    export let name;
</script>

<main class="ola">
    <h1>Svelte</h1>
    <VoteList />
</main>

<style lang="scss">
    .ola {
        padding: 1em;
        max-width: 240px;
        h1 {
            font-size: 3em;
            font-weight: 500;
        }
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>

<script>
    export let options;
    export let color = "#fff";

    function total() {
        let totalVotos = 0;
        options.forEach((option) => {
            totalVotos += option.count;
        });
        return totalVotos;
    }
</script>

<div>
    {#each options as option, index (index)}
        <p style="color: {color}">
            {index + 1}. {option.option} - {option.count} votos ({parseInt(
                (option.count / total()) * 100
            )}%)
        </p>
    {/each}
</div>

<style lang="scss">
    div {
        margin: 0 50px;
        p {
            font-size: 18px;
            font-weight: 500;
            font-family: "Roboto", sans-serif;
        }
    }
</style>

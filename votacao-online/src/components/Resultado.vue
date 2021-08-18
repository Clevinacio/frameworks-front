<template>
    <div class="result">
        <p v-for="(option, index) in opcoes" :key="option">
            {{ index + 1 }}. {{ option.option }} - {{ option.count }} votos ({{
                parseInt((option.count / totalCount) * 100)
            }}%)
        </p>
    </div>
</template>

<script>
export default {
    props: ["opcoes", "totalCount"],
};
</script>

<style lang="scss">
.result {
    margin: 0 50px;
    p {
        font-size: 18px;
        font-weight: 500;
        font-family: "Roboto", sans-serif;
        color: #2c3e50;
    }
}
</style>
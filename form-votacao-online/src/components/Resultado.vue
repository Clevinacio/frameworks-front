<template>
    <div class="result">
        <p v-for="(option, index) in options" :key="option">
            {{ index + 1 }}. {{ option.option }} - {{ option.count }} votos ({{
                parseInt((option.count / getTotalVotes) * 100)
            }}%)
        </p>
    </div>
</template>

<script>
export default {
    props: ["options"],
    data() {
        return {
            newOptions: this.options,
        };
    },
    methods: {
        getTotalVotes() {
            let totalVotes = 0;
            this.options.forEach((option) => {
                totalVotes += option.count;
            });
            return totalVotes;
        },
    },
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
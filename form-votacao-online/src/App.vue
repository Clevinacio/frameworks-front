<template>
    <h1>Vue</h1>
    <VoteList />
</template>

<script>
import VoteList from "./components/VoteList.vue";

export default {
    name: "App",
    components: {
        VoteList,
    },
};
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 30px;
    margin-left: 30px;
}
</style>

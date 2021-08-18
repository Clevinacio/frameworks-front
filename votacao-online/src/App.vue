<template>
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

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
}
</style>

<template>
    <div class="options">
        <button
            v-for="(option, index) in options"
            :key="option"
            @click="$emit('votar', index)"
        >
            {{ option.option }}
        </button>
    </div>
</template>

<script>
export default {
    props: ["options"],
};
</script>

<style lang="scss">
.options {
    margin: 30px auto;
    display: flex;
    align-items: center;
    justify-content: center;

    button {
        max-width: 120px;
        height: 30px;
        padding: 0px 30px;
        margin-left: 5px;
        margin-right: 5px;
        color: rgb(234, 246, 255);
        background: rgb(22, 110, 62);
        border: 0;
        border-radius: 8px;
        cursor: pointer;

        transition: filter 0.2s;

        &:hover {
            filter: brightness(0.9);
        }
    }
}
</style>
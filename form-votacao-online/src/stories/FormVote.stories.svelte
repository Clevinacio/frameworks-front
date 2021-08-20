<script>
    import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
    import FormVote from "../components/FormVote.svelte";
</script>

<Meta title="Votacao/Form" component={FormVote} />

<Template let:args>
    <FormVote {...args} />
</Template>

<Story
    name="FormDemo"
    args={{
        vote: {
            statement: "",
            options: [
                {
                    option: "",
                    count: 0,
                },
                {
                    option: "",
                    count: 0,
                },
                {
                    option: "",
                    count: 0,
                },
            ],
        },
    }}
/>

<Story
    name="FormDemo2"
    args={{
        vote: {
            statement: "teste",
            options: [
                {
                    option: "sim",
                    count: 0,
                },
                {
                    option: "nao",
                    count: 0,
                },
                {
                    option: "",
                    count: 0,
                },
            ],
        },
    }}
/>

<Story
    name="FormDemo3"
    args={{
        vote: {
            statement: "teste",
            options: [
                {
                    option: "sim",
                    count: 0,
                },
                {
                    option: "nao",
                    count: 0,
                },
                {
                    option: "talvez",
                    count: 0,
                },
            ],
        },
    }}
/>

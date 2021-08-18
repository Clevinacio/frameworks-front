<script>
    import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
    import FormVote from "../components/FormVote.svelte";
</script>

<Meta title="Votacao/Form" component={FormVote} />

<Template let:args>
    <FormVote {...args} />
</Template>

<Story name="FormDemo" />

<Story
    name="FormDemo2"
    args={{
        vote: {
            statement: "teste",
            options: ["sim", "não", "não sei"],
        },
    }}
/>

<Story
    name="FormDemo3"
    args={{
        vote: {
            statement: "teste",
            options: ["sim", "não"],
        },
    }}
/>

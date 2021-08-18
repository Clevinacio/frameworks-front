<script>
    import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
    import VoteList from "../components/VoteList.svelte";
</script>

<Meta title="Votacao/VoteListDemo" component={VoteList} />

<Template let:args>
    <VoteList />
</Template>

<Story name="FormDemo" />

<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Cabine from "../components/Cabine.svelte";
</script>

<Meta
  title="Votacao/Cabine"
  component={Cabine}
  argTypes={{
    onClick: { action: "onClick" },
  }}
/>

<Template let:args>
  <Cabine {...args} on:click={args.onClick} />
</Template>

<Story
  name="Cabine1"
  args={{
    opcoes: [
      {
        opcao: "Sim",
        count: 6,
      },
      {
        opcao: "Não",
        count: 5,
      },
    ],
  }}
/>

<Story
  name="Cabine2"
  args={{
    opcoes: [
      {
        opcao: "Sim",
        count: 6,
      },
      {
        opcao: "Não",
        count: 5,
      },
      {
        opcao: "Talvez",
        count: 3,
      },
    ],
  }}
/>

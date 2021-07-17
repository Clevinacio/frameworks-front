<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Resultado from "../components/Resultado.svelte";
</script>

<Meta
  title="Votacao/Resultado"
  component={Resultado}
  argTypes={{
    color: { control: "color" },
  }}
/>

<Template let:args>
  <Resultado {...args} on:click={args.onClick} />
</Template>

<Story
  name="Resultado1"
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
    totalVotos: 11,
  }}
/>

<Story
  name="Resultado2"
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
    totalVotos: 14,
  }}
/>

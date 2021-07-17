<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import CardVotacao from "../components/CardVotacao.svelte";
</script>

<Meta
  title="Votacao/CardVotacao"
  component={CardVotacao}
  argTypes={{
    mode: {
      control: { type: "select", options: ["open", "closed"] },
    },
  }}
/>

<Template let:args>
  <CardVotacao {...args} />
</Template>

<Story
  name="CardVotacao1"
  args={{
    pergunta: "Hevará aula hoje?",
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
    mode: "open",
  }}
/>

<Story
  name="CardVotacao2"
  args={{
    pergunta: "Esse trabalho é obrigatório?",
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
    mode: "closed",
  }}
/>

import CardVotacao from '../components/CardVotacao.vue';

export default {
  title: 'VotacaoVue/CardVotacao',
  component: CardVotacao,
  argTypes: {
    mode: {
      options: ["open", "closed"],
      control: {
        type: "radio"
      }
    }
  }
}

const Template = (args) => ({
  components: { CardVotacao },

  setup() {
    return { args }
  },

  template: '<card-votacao v-bind="args"/>',
});

export const Resultado1 = Template.bind({});
Resultado1.args = {
  pergunta: "Vai ter aula amanhã?",
  opcoes: [
    {
      opcao: "Sim",
      count: 3,
    },
    {
      opcao: "Não",
      count: 7,
    }
  ],
  totalCount: 10,
  mode: "open"
}

export const Resultado2 = Template.bind({});
Resultado2.args = {
  pergunta: "Esse trabalho é obrigatório?",
  opcoes: [
    {
      opcao: "Sim",
      count: 3,
    },
    {
      opcao: "Não",
      count: 7,
    },
    {
      opcao: "Talvez",
      count: 2,
    },
  ],
  totalCount: 17,
  mode: "closed"
}
import Resultado from '../components/Resultado.vue';

export default {
  title: 'Votacao/Resultado',
  component: Resultado
}

const Template = (args) => ({
  components: { Resultado },

  setup() {
    return { args }
  },

  template: '<resultado v-bind="args"/>',
});

export const Resultado1 = Template.bind({});
Resultado1.args = {
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
  totalCount: 10
}

export const Resultado2 = Template.bind({});
Resultado2.args = {
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
  totalCount: 17
}
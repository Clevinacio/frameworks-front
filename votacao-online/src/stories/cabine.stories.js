import Cabine from '../components/Cabine.vue';

export default {
  title: 'Votacao/Cabine',
  component: Cabine
}

const Template = (args) => ({
  components: { Cabine },

  setup() {
    return { args }
  },

  template: '<cabine v-bind="args"/>',
});

export const Cabine1 = Template.bind({});
Cabine1.args = {
  opcoes: [
    {
      opcao: "Sim",
      count: 3,
    },
    {
      opcao: "Não",
      count: 7,
    }
  ]
}

export const Cabine2 = Template.bind({});
Cabine2.args = {
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
  ]
}

import React from 'react';

import Resultado from '../components/Resultado';

export default {
  title: 'Votacao/Resultado',
  component: Resultado
}

const Template = (args) => <Resultado {...args} />

export const Resultado1 = Template.bind({});
Resultado1.args = {
  opcoes: [
    {
      opcao: "Sim",
      count: 5,
    },
    {
      opcao: "Não",
      count: 7,
    },
  ],
  totalVotos: 11
}

export const Resultado2 = Template.bind({});
Resultado2.args = {
  opcoes: [
    {
      opcao: "Sim",
      count: 5,
    },
    {
      opcao: "Não",
      count: 7,
    },
    {
      opcao: "Talvez",
      count: 8,
    }
  ],
  totalVotos: 19
}
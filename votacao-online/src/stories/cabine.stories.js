import React from 'react';

import Cabine from '../components/Cabine';

export default {
  title: 'Votacao/Cabine',
  component: Cabine
}

const Template = (args) => <Cabine {...args} />;

export const DuasOpcoes = Template.bind({});
DuasOpcoes.args = {
  opcoes: [
    {
      opcao: "Sim",
      count: 5,
    },
    {
      opcao: "Não",
      count: 7,
    },
  ]
}

export const TresOpcoes = Template.bind({});
TresOpcoes.args = {
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
  ]
}
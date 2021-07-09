import React from 'react';

import CardVotacao from '../components/CardVotacao'
import cabineStories from './cabine.stories';

export default {
  title: 'Votacao/CardVotacao',
  component: CardVotacao,
  argTypes: {
    mode: {
      options: ['open', 'closed'],
      control: { type: 'radio' }
    }
  }
}

const Template = (args) => <CardVotacao {...args} />;

export const Card1 = Template.bind({});
Card1.args = {
  pergunta: 'Essa atividade é obrigatória?',
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
  mode: 'open'
};

export const Card2 = Template.bind({});
Card2.args = {
  pergunta: 'Teremos aula amanhã?',
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
  mode: 'closed'
};
import { CommonModule } from '@angular/common';
import { ResultadoComponent } from 'src/app/resultado/resultado.component';
import { CabineComponent } from './../app/cabine/cabine.component';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { CardVotacaoComponent } from './../app/card-votacao/card-votacao.component';
import { moduleMetadata } from '@storybook/angular';

export default {
  title: 'Votacao/CardVotacao',
  component: CardVotacaoComponent,
  decorators: [
    moduleMetadata({
      declarations: [CabineComponent, ResultadoComponent],
      imports: [CommonModule],
    }),
  ],
  argTypes: {
    mode: {
      options: ['open', 'closed'],
      control: { type: 'radio' }
    }
  }
} as Meta;

const Template: Story<CardVotacaoComponent> = (args: CardVotacaoComponent) => ({
  props: args,
});

export const Card1 = Template.bind({})
Card1.args = {
  pergunta: 'Essa atividade é obrigatória?',
  opcoes: [
    {
      opcao: 'Sim',
      count: 6,
    },
    {
      opcao: 'Não',
      count: 5,
    },
  ],
  mode: 'open',
}

export const Card2 = Template.bind({})
Card2.args = {
  pergunta: 'Haverá aula amanhã?',
  opcoes: [
    {
      opcao: 'Sim',
      count: 6,
    },
    {
      opcao: 'Não',
      count: 5,
    },
    {
      opcao: 'Talvez',
      count: 3,
    }
  ],
  mode: 'closed'
}
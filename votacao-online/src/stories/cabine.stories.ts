import { CabineComponent } from './../app/cabine/cabine.component';
import { Story, Meta } from '@storybook/angular/types-6-0';

export default {
  title: 'Votacao/Cabine',
  component: CabineComponent,
  argTypes: {}
} as Meta;

const Template: Story<CabineComponent> = (args: CabineComponent) => ({
  props: args,
});

export const DuasOpções = Template.bind({});
DuasOpções.args = {
  opcoes: [
    {
      opcao: 'Sim',
      count: 6,
    },
    {
      opcao: 'Não',
      count: 5,
    },
  ]
};

export const TrêsOpções = Template.bind({});
TrêsOpções.args = {
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
  ]
};
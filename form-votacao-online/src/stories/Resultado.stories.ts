import { Story, Meta } from '@storybook/angular/types-6-0';
import { ResultadoComponent } from 'src/app/resultado/resultado.component';

export default {
    title: 'Votacao/Resultado',
    component: ResultadoComponent,
    argTypes: {
        color: { control: 'color' },
    },
} as Meta;

const Template: Story<ResultadoComponent> = (args: ResultadoComponent) => ({
    props: args,
});

export const Votacao1 = Template.bind({});
Votacao1.args = {
    voteOptions: [
        {
            option: 'Sim',
            count: 6,
        },
        {
            option: 'Não',
            count: 5,
        },
    ],
}

export const Votacao2 = Template.bind({});
Votacao2.args = {
    voteOptions: [
        {
            option: 'Sim',
            count: 6,
        },
        {
            option: 'Não',
            count: 5,
        },
        {
            option: 'Talvez',
            count: 3,
        }
    ]
}
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { CabineComponent } from 'src/app/cabine/cabine.component';
import { CardVotacaoComponent } from 'src/app/card-votacao/card-votacao.component';
import { ResultadoComponent } from 'src/app/resultado/resultado.component';
import { VoteFormComponent } from 'src/app/vote-form/vote-form.component';
import { VoteListComponent } from './../app/vote-list/vote-list.component';


export default {
    title: 'Votacao/VoteList',
    component: VoteListComponent,
    decorators: [
        moduleMetadata({
            declarations: [
                VoteFormComponent,
                CardVotacaoComponent,
                CabineComponent,
                ResultadoComponent
            ],
            imports: [CommonModule, FormsModule],
        }),
    ],
    argTypes: {
        color: { control: 'color' },
    },
} as Meta;

const Template: Story<VoteListComponent> = (args: VoteListComponent) => ({
    props: args,
});

export const FormDemo = Template.bind({});
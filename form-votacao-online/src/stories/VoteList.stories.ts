import { Story, Meta } from '@storybook/angular/types-6-0';
import { VoteListComponent } from './../app/vote-list/vote-list.component';


export default {
    title: 'Votacao/VoteList',
    component: VoteListComponent,
    argTypes: {
        color: { control: 'color' },
    },
} as Meta;

const Template: Story<VoteListComponent> = (args: VoteListComponent) => ({
    props: args,
});

export const FormDemo = Template.bind({});
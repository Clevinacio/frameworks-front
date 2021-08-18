import { Story, Meta } from '@storybook/angular/types-6-0';
import { VoteFormComponent } from 'src/app/vote-form/vote-form.component';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export default {
    title: 'Votacao/VoteForm',
    component: VoteFormComponent,
    decorators: [
        moduleMetadata({
            declarations: [
                VoteFormComponent,
            ],
            imports: [CommonModule, FormsModule],
        }),
    ],

    argTypes: {
        color: { control: 'color' },
    },
} as Meta;

const Template: Story<VoteFormComponent> = (args: VoteFormComponent) => ({
    props: args,
});

export const Form1 = Template.bind({});
Form1.args = {
    vote: {
        statement: "",
        options: [
            {
                option: "",
                count: 0
            },
            {
                option: "",
                count: 0
            },
            {
                option: "",
                count: 0
            }
        ]
    }
}


export const Form2 = Template.bind({});
Form2.args = {
    vote: {
        statement: "teste",
        options: [
            {
                option: "sim",
                count: 0
            },
            {
                option: "não",
                count: 0
            },
            {
                option: "",
                count: 0
            }
        ]
    }
}

export const Form3 = Template.bind({});
Form3.args = {
    vote: {
        statement: "teste",
        options: [
            {
                option: "sim",
                count: 0
            },
            {
                option: "não",
                count: 0
            },
            {
                option: "não sei",
                count: 0
            }
        ]
    }
}
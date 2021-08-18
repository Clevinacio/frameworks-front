import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import FormVotes from '../components/FormVotes';


export default {
    title: 'Example/FormVotes',
    component: FormVotes,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof FormVotes>;

const Template: ComponentStory<typeof FormVotes> = (args) => <FormVotes {...args} />;

export const Form = Template.bind({});
Form.args = {
    vote: {
        statement: "",
        voteOptions: [
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
};

export const Form2 = Template.bind({});
Form2.args = {
    vote: {
        statement: "test",
        voteOptions: [
            {
                option: "sim",
                count: 0
            },
            {
                option: "nao",
                count: 0
            },
            {
                option: "",
                count: 0
            }
        ]
    }
};

export const Form3 = Template.bind({});
Form3.args = {
    vote: {
        statement: "test",
        voteOptions: [
            {
                option: "sim",
                count: 0
            },
            {
                option: "nao",
                count: 0
            },
            {
                option: "abstencao",
                count: 0
            }
        ]
    }
};


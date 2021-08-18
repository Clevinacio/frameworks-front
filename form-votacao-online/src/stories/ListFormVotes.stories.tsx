import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ListFormVotes from '../components/ListFormVotes';


export default {
    title: 'Example/ListFormVotes',
    component: ListFormVotes,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ListFormVotes>;

const Template: ComponentStory<typeof ListFormVotes> = (args) => <ListFormVotes />;

export const ListDemo = Template.bind({});


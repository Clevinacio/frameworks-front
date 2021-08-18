import VoteForm from '../components/VoteForm.vue';

export default {
    title: 'Votacao/VoteForm',
    component: VoteForm
}

const Template = (args) => ({
    components: { VoteForm },

    setup() {
        return { args }
    },

    template: '<VoteForm v-bind="args"/>',
});

export const VoteForm1 = Template.bind({});
VoteForm1.args = {
    vote: {
        statement: "",
        options: [
            {
                option: "",
                count: 0,
            },
            {
                option: "",
                count: 0,
            },
            {
                option: "",
                count: 0,
            },
        ]
    }
}

export const VoteForm2 = Template.bind({});
VoteForm2.args = {
    vote: {
        statement: "Teste",
        options: [
            {
                option: "sim",
                count: 0,
            },
            {
                option: "não",
                count: 0,
            },

        ]
    }
}

export const VoteForm3 = Template.bind({});
VoteForm3.args = {
    vote: {
        statement: "Teste",
        options: [
            {
                option: "sim",
                count: 0,
            },
            {
                option: "não",
                count: 0,
            },
            {
                option: "talvez",
                count: 0,
            },
        ]
    }
}

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

export const VoteForm2 = Template.bind({});
VoteForm2.args = {
    vote: {
        statement: "Teste",
        options: [
            "sim",
            "não",
            "não sei"
        ]
    }
}

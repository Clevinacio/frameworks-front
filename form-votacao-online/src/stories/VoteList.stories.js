import VoteList from '../components/VoteList.vue';

export default {
    title: 'Votacao/VoteList',
    component: VoteList
}

const Template = (args) => ({
    components: { VoteList },

    setup() {
        return { args }
    },

    template: '<VoteList v-bind="args"/>',
});

export const VoteList1 = Template.bind({});

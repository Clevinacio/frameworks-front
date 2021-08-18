import { reactive, readonly, computed } from 'vue'

const vtList = reactive([])

export const votes = readonly(vtList)
export const size = computed(() => vtList.length)

export function createVote() {
    vtList.push({
        statement: '',
        options: [
            {
                option: '',
                count: 0
            },
            {
                option: '',
                count: 0
            },
            {
                option: '',
                count: 0
            }
        ],
    })
}

export function updateVote(vote, index) {
    vtList[index] = vote
}

export function removeVote(index) {
    vtList.splice(index, 1)
}
import { Injectable } from '@angular/core';

type OptionsType = {
    option: string,
    count: number
}

type VoteType = {
    statement: string,
    options: OptionsType[]
};
@Injectable({
    providedIn: 'root'
})
export class VoteService {
    votes: VoteType[] = []

    createVote() {
        this.votes.push({
            statement: '',
            options: [
                { option: '', count: 0 },
                { option: '', count: 0 },
                { option: '', count: 0 },
            ]
        });
    }

    updateVote(vote: VoteType, index: number) {
        this.votes[index] = vote;
    }

    deleteVote(index: number) {
        this.votes.splice(index, 1);
    }
}

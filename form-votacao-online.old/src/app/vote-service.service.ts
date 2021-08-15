import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class VoteService {
    votes: any = [];

    createVote() {
        this.votes.push({ statement: '', options: [] });
    }

    updateVote(vote: any, index: number) {
        this.votes[index] = vote;
    }

    deleteVote(index: number) {
        this.votes.splice(index, 1);
    }
}

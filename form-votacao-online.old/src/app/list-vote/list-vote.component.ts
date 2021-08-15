import { Component, OnInit } from '@angular/core';
import { VoteService } from '../vote-service.service';

interface VoteType {
    statement: string;
    options: string[];
};

@Component({
    selector: 'list-vote',
    templateUrl: './list-vote.component.html',
    styleUrls: ['./list-vote.component.scss']
})
export class ListVoteComponent {
    mode = 'view';
    current: number = 0;

    constructor(public voteService: VoteService) {
    }

    addVote() {
        this.mode = 'add';
        this.voteService.createVote();
        this.current = this.voteService.votes.length - 1;
    }

    editVote(index: number) {
        this.current = index;
        this.mode = 'edit';
    }

    removeVote(index: number) {
        this.voteService.deleteVote(index);
    }

    updateChanges(vote: VoteType) {
        this.voteService.updateVote(vote, this.current);
        this.mode = 'view'
    }

    cancelChanges() {
        if (this.mode === 'add') {
            this.voteService.deleteVote(this.voteService.votes.length - 1)
        }
        this.mode = 'view'
    }
}

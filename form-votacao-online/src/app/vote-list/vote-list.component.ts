import { Component } from '@angular/core';
import { VoteService } from '../vote-service.service';

type OptionsType = {
    option: string,
    count: number
}

type VoteType = {
    statement: string,
    options: OptionsType[]
};

@Component({
    selector: 'vote-list',
    templateUrl: './vote-list.component.html',
    styleUrls: ['./vote-list.component.scss']
})
export class VoteListComponent {
    mode: string = 'view';
    current: number = 0;

    constructor(public voteService: VoteService) { }

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

    showVote(index: number) {
        this.current = index;
        this.mode = 'show';
    }
}
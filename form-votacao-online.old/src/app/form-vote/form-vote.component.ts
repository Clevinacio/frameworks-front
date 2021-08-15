import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';


interface VoteType {
    statement: string;
    options: string[];
};

@Component({
    selector: 'form-vote',
    templateUrl: './form-vote.component.html',
    styleUrls: ['./form-vote.component.scss']
})
export class FormVoteComponent implements OnInit {
    @Input() vote!: VoteType;
    model = {
        statement: '',
        options: [],
    }
    @Output() update = new EventEmitter();
    @Output() cancel = new EventEmitter();
    votes: any;
    ngOnInit() {
        const { statement, options } = this.vote || {};
        const [option1, option2, option3] = options || []
        this.votes = {
            statement,
            option1,
            option2,
            option3
        };
    }

    onSubmit() {
        const options = [
            this.votes.option1,
            this.votes.option2,
            this.votes.option3].filter((o) => o && o.trim() !== '');
        this.update.emit({
            statement: this.votes.statement,
            options
        });

        console.log(this.votes);
    }
}
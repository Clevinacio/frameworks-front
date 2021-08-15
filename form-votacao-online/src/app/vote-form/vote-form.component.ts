import { Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';

type OptionsType = {
    option: string,
    count: number
}

type VoteType = {
    statement: string,
    options: OptionsType[]
};

type DataVoteType = {
    statement: string,
    voteOption1: string,
    voteOption2: string,
    voteOption3: string,
}

@Component({
    selector: 'vote-form',
    templateUrl: './vote-form.component.html',
    styleUrls: ['./vote-form.component.scss']
})
export class VoteFormComponent implements OnInit {
    @Input() vote!: VoteType;
    @Output() cancel = new EventEmitter();
    @Output() update = new EventEmitter();
    vt: DataVoteType;

    constructor() {
        this.vt = {} as DataVoteType;
    }

    ngOnInit() {
        const { statement, options } = this.vote || {};
        const [option1, option2, option3] = options || [];
        this.vt = {
            statement: statement,
            voteOption1: option1.option,
            voteOption2: option2.option,
            voteOption3: option3.option,
        };
    }

    onSubmit(e: Event) {
        var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            const options = [
                {
                    option: this.vt.voteOption1,
                    count: 0
                },
                {
                    option: this.vt.voteOption2,
                    count: 0
                },
                {
                    option: this.vt.voteOption3,
                    count: 0
                }
            ].filter((o) => o.option !== '');
            this.update.emit({
                statement: this.vt.statement,
                options
            });
        }
        form.classList.add('was-validated');
    }

}

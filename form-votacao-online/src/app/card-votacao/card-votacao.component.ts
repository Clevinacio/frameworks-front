import { Component, Input, OnInit } from '@angular/core';
import { VoteService } from '../vote-service.service';

type OptionsType = {
    option: string,
    count: number
}

@Component({
    selector: 'card-votacao',
    templateUrl: './card-votacao.component.html',
    styleUrls: ['./card-votacao.component.scss']
})
export class CardVotacaoComponent implements OnInit {
    @Input()
    statement!: string
    @Input()
    options!: OptionsType[]

    localOptions: OptionsType[] = [];
    mode: string = 'open';

    constructor(public voteService: VoteService) { }

    ngOnInit() {
        console.log(this.options);
        this.localOptions = this.options;
    }


    vote(index: number) {
        this.localOptions[index].count += 1;
    }

    showResult() {
        this.mode = 'closed';
    }

}

import { Component, Input, OnInit } from '@angular/core';

type OptionsType = {
    count: number,
    option: string
}

@Component({
    selector: 'resultado',
    templateUrl: './resultado.component.html',
    styleUrls: ['./resultado.component.scss']
})
export class ResultadoComponent implements OnInit {
    @Input() voteOptions!: OptionsType[];
    total: number = 0;

    ngOnInit() {
        this.total = this.totalVotos();
    }

    totalVotos = () => {
        console.log(this.voteOptions);
        let total = 0
        this.voteOptions.forEach(option => {
            total += option.count
        })
        return total
    }
}

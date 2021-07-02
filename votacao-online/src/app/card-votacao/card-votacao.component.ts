import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'card-votacao',
  templateUrl: './card-votacao.component.html',
  styleUrls: ['./card-votacao.component.scss']
})
export class CardVotacaoComponent implements OnInit {
  mode: string = 'open';

  ngOnInit(): void {
  }

}

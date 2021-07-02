import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'card-votacao',
  templateUrl: './card-votacao.component.html',
  styleUrls: ['./card-votacao.component.scss']
})
export class CardVotacaoComponent implements OnInit {
  pergunta = "Pergunta um pouco maior para testar o espaçamento lore"
  opcoes = [
    'Sim',
    'Não',
    'Talvez'
  ]
  mode: string = 'open';

  result() {
    this.mode = 'closed';
  }

  ngOnInit(): void {
  }

}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'card-votacao',
  templateUrl: './card-votacao.component.html',
  styleUrls: ['./card-votacao.component.scss']
})
export class CardVotacaoComponent implements OnInit {
  @Input()
  pergunta = "Pergunta um pouco maior para testar o espaçamento"
  @Input()
  opcoes = [
    {
      opcao: 'Sim',
      count: 6,
    },
    {
      opcao: 'Não',
      count: 5,
    },
    {
      opcao: 'Talvez',
      count: 3,
    }
  ]
  @Input()
  mode: string = 'open';

  totalVotes: number = 0;
  result() {
    this.opcoes.forEach(opcao => {
      this.totalVotes += opcao.count
    });
    this.mode = 'closed';
  }

  onClick(index: number) {
    this.opcoes[index].count += 1;
    console.log(this.opcoes[index].count);
  }

  ngOnInit(): void {
  }

}

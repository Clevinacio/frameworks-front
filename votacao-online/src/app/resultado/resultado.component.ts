import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss']
})
export class ResultadoComponent implements OnInit {
  @Input()
  opcoes!: string;

  @Input()
  contador!: number;

  ngOnInit(): void {
  }

}

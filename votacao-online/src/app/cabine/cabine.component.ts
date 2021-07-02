import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cabine',
  templateUrl: './cabine.component.html',
  styleUrls: ['./cabine.component.scss']
})
export class CabineComponent implements OnInit {
  @Input() titulo!: string;
  @Input() opcoes!: string[];
  @Input() selecao!: number;
  ngOnInit(): void {
  }

}

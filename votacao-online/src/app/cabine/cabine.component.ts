import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cabine',
  templateUrl: './cabine.component.html',
  styleUrls: ['./cabine.component.scss']
})
export class CabineComponent implements OnInit {
  @Input() opcoes!: any;
  @Output() click = new EventEmitter<number>();

  ngOnInit(): void {
  }

}

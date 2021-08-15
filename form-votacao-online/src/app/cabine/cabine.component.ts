import { Component, Input, Output, EventEmitter } from '@angular/core';

type OptionsType = {
    option: string,
    count: number
}

@Component({
    selector: 'cabine',
    templateUrl: './cabine.component.html',
    styleUrls: ['./cabine.component.scss']
})
export class CabineComponent {
    @Input() options!: OptionsType[];
    @Output() click = new EventEmitter<number>();

}

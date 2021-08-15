import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'vote-form',
    templateUrl: './vote-form.component.html',
    styleUrls: ['./vote-form.component.scss']
})
export class VoteFormComponent {
    @Output() cancel = new EventEmitter();
    constructor() { }

    onSubmit(e: Event) {
        console.log('onSubmit');
        var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        form.classList.add('was-validated');
    }

}

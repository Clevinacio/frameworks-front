import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { VoteListComponent } from './vote-list/vote-list.component';
import { VoteFormComponent } from './vote-form/vote-form.component';
import { CardVotacaoComponent } from './card-votacao/card-votacao.component';
import { CabineComponent } from './cabine/cabine.component';
import { ResultadoComponent } from './resultado/resultado.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        AppComponent,
        VoteListComponent,
        VoteFormComponent,
        CardVotacaoComponent,
        CabineComponent,
        ResultadoComponent
    ],
    imports: [
        BrowserModule,
        NgbModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

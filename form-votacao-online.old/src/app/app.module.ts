import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { CardVotacaoComponent } from './card-votacao/card-votacao.component';
import { CabineComponent } from './cabine/cabine.component';
import { ResultadoComponent } from './resultado/resultado.component';
import { FormVoteComponent } from './form-vote/form-vote.component';
import { ListVoteComponent } from './list-vote/list-vote.component';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        AppComponent,
        CardVotacaoComponent,
        CabineComponent,
        ResultadoComponent,
        FormVoteComponent,
        ListVoteComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        FormlyModule.forRoot({
            validationMessages: [{ name: 'required', message: 'Campo obrigatório' }],
            extras: { lazyRender: true }
        }),
        FormlyBootstrapModule,
        NgbModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

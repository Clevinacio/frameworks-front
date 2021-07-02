import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardVotacaoComponent } from './card-votacao.component';

describe('CardVotacaoComponent', () => {
  let component: CardVotacaoComponent;
  let fixture: ComponentFixture<CardVotacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardVotacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardVotacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

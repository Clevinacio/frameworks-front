import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabineComponent } from './cabine.component';

describe('CabineComponent', () => {
  let component: CabineComponent;
  let fixture: ComponentFixture<CabineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CabineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

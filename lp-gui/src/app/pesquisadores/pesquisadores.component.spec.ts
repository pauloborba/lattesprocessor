import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisadoresComponent } from './pesquisadores.component';

describe('PesquisadoresComponent', () => {
  let component: PesquisadoresComponent;
  let fixture: ComponentFixture<PesquisadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesquisadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesquisadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

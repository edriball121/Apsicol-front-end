import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAgricolaPecuarioComponent } from './detalle-agricola-pecuario.component';

describe('DetalleAgricolaPecuarioComponent', () => {
  let component: DetalleAgricolaPecuarioComponent;
  let fixture: ComponentFixture<DetalleAgricolaPecuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleAgricolaPecuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleAgricolaPecuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

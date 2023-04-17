import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GranjeroComponent } from './granjero.component';

describe('GranjeroComponent', () => {
  let component: GranjeroComponent;
  let fixture: ComponentFixture<GranjeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GranjeroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GranjeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

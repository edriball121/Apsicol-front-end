import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgricolaComponent } from './agricola.component';

describe('AgricolaComponent', () => {
  let component: AgricolaComponent;
  let fixture: ComponentFixture<AgricolaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgricolaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgricolaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

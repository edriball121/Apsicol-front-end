import { TestBed } from '@angular/core/testing';

import { GranjeroService } from './granjero.service';

describe('GranjeroService', () => {
  let service: GranjeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GranjeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { AgricolaService } from './agricola.service';

describe('AgricolaService', () => {
  let service: AgricolaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgricolaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

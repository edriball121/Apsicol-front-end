import { TestBed } from '@angular/core/testing';

import { CanastaService } from './canasta.service';

describe('CanastaService', () => {
  let service: CanastaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanastaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

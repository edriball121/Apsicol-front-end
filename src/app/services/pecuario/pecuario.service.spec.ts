import { TestBed } from '@angular/core/testing';

import { PecuarioService } from './pecuario.service';

describe('PecuarioService', () => {
  let service: PecuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PecuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

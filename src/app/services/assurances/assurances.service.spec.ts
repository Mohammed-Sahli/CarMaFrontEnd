import { TestBed } from '@angular/core/testing';

import { assurancesService } from '../assurances/assurances.service';

describe('assurancesService', () => {
  let service: assurancesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(assurancesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

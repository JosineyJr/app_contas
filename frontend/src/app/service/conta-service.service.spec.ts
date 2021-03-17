import { TestBed } from '@angular/core/testing';

import { ContaServiceService } from './conta-service.service';

describe('ContaServiceService', () => {
  let service: ContaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

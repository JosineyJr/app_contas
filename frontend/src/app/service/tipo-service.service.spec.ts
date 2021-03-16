import { TestBed } from '@angular/core/testing';

import { TipoServiceService } from './tipo-service.service';

describe('TipoServiceService', () => {
  let service: TipoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

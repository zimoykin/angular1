import { TestBed } from '@angular/core/testing';

import { Http } from '../http-service.service';

describe('HttpServiceService', () => {
  let service: Http;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Http);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { Auth } from '../authorization-service.service';

describe('AuthorizationServiceService', () => {
  let service: Auth;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Auth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

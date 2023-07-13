/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdminLayoutService } from './admin-layout.service';

describe('Service: AdminLayout', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminLayoutService]
    });
  });

  it('should ...', inject([AdminLayoutService], (service: AdminLayoutService) => {
    expect(service).toBeTruthy();
  }));
});

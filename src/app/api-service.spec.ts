import { TestBed, inject } from '@angular/core/testing';

import { ApiService } from './api-service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';


describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ApiService, HttpClient]
    });
  });

  it('should be created', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));
});

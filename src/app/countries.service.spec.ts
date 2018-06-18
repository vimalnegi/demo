import { TestBed, inject } from '@angular/core/testing';

import { CountriesService } from './countries.service';
import { ApiService } from './api-service';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';



describe('CountriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CountriesService, ApiService, StorageService]
    });
  });

  it('should be created', inject([CountriesService], (service: CountriesService) => {
    expect(service).toBeTruthy();
  }));
});

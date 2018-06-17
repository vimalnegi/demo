import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor() {

  }

  setKey(key, value) {
    window.localStorage[key] = JSON.stringify(value);
  }

  get(key) {
    return JSON.parse(window.localStorage[key]);
  }
}

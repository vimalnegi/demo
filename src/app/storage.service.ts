import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor() {

  }

  setKey(key, value) {
    window.localStorage[key] = JSON.stringify(value);
  }

  get(key) {
    const data = window.localStorage[key];
    if (data) {
      return JSON.parse(window.localStorage[key]);
    } else {
      return '';
    }
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { parse } from 'querystring';
@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  get(url: string, query: any = {}) {
    const urlWithQuery = `${url}/${parse(query)}`;
    return this.http.get(urlWithQuery);
  }
}

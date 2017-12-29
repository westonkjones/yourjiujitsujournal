import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LocalProvider {

  constructor(public http: HttpClient) {
  }

  public createLog(): void
  {
    console.log('created log');
  }
}

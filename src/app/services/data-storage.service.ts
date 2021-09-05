import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor() { }

  getItem(key: string): Observable<any> {
    let data = localStorage.getItem(key);
    if (data) {
      return of(JSON.parse(data));
    } else {
      return of(null);
    }
  }

  setItem(data: {key: string, value: any}): Observable<any> {
    data.value = JSON.stringify(data.value);
    return of(localStorage.setItem(data.key, data.value));
  }

  removeItem(key: string) {
    if (key === 'user') {
      // Clearing all storage on logout
      localStorage.clear();
    } else {
      localStorage.removeItem(key);
    }
    return of(null);
  }
}

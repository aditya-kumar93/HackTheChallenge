import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataStorageService } from './services/data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class Log2Service {

  constructor(
    private router: Router,
    private storageService: DataStorageService,
  ) { }

  async canActivate() {
    const user = await this.storageService.getItem('employee').toPromise()
    if (user) {
      this.router.navigate(['/'])
      return false
    }
    return true;

  }
}

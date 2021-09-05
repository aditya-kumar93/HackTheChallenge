import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataStorageService } from './data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private router: Router,
    private storageService: DataStorageService,
    
  ) { }

  async canActivate() {
    const user = await this.storageService.getItem('employee').toPromise()
    if (!user) {
      this.router.navigate(['/', 'sign_in'])
      return false
    }
    return true;

  }
}

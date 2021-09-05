import { DataStorageService } from './../services/data-storage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  employeeId!: string;
  constructor(
    private router: Router,
    private dataStorageService : DataStorageService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form: any){

    if(!form.invalid){
      this.dataStorageService.setItem({key: 'employee', value: this.employeeId})
      this.router.navigate(['/']);
    } 
  }

}

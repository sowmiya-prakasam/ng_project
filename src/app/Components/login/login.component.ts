import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,
    RouterModule,
    CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
 PasswordPattern =
  /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/  

  isAuthentication:boolean;
  constructor(private fb:FormBuilder,private router:Router){

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.pattern(this.PasswordPattern)]]
    })
    this.isAuthentication = false; 
  }

  OnSubmit(){
    if(this.loginForm.invalid){
      return;
    }
    if(this.loginForm.valid){
      let localData = localStorage.getItem('signup-data');
      console.log(typeof localData);

      let lData_obj = JSON.parse( localData|| " ");
      console.log(typeof lData_obj,'exist');
     
      let isDataExists = lData_obj.find((user:any)=> user.email == this.loginForm.get('email')?.value && user.password== this.loginForm.get('password')?.value );

      if(isDataExists){
        this.router.navigate(['/products']);
      }
      else{
        this.isAuthentication = true;
      }
      }
      
    }
  get f(){
    return this.loginForm.controls
    
  }
  

}  


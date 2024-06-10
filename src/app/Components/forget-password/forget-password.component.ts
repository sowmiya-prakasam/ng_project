import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Validation } from '../../validation';
import { lookup } from 'dns';


@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ ReactiveFormsModule,
    RouterModule,
    CommonModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent implements OnInit {
  forgetForm: FormGroup;
   PasswordPattern =
   /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/  

   isUpdated:boolean;
   isEmail:boolean;
   constructor(private fb:FormBuilder,private router:Router){

   }

  ngOnInit(): void {
    this.forgetForm = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.pattern(this.PasswordPattern)]],
      cmPassword:['',[Validators.required,Validators.pattern(this.PasswordPattern)]],
    
      
      },{ validators: [Validation.match('password', 'cmPassword')]})
      this.isUpdated=false;
      this.isEmail=false;
    
  }
  OnSubmit(){
    let localData = localStorage.getItem('signup-data');
    console.log(localData,'checklD');
    let lD_onj = JSON.parse(localData||"");
    console.log(lD_onj,'beforeupdate');
  
  let findByEmail = lD_onj.find((user:any)=>user.email ==this.forgetForm.get('email')?.value);
  
  if(findByEmail){
      console.log(this.f['password'].value,'bfup');
    findByEmail.password=this.f['password'].value;
    localStorage.setItem('signup-data',JSON.stringify(lD_onj));
    this.isUpdated=true;
    this.isEmail=false;
  }
  else{
    this.isEmail=true;
  }
  console.log(lD_onj,"updateduser");
  

  }
  get f(){
    return this.forgetForm.controls
    
  }
  
}







import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'
import { ToastrModule, ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule,
    CommonModule,
    ToastrModule,
    RouterModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit{
  signupForm: FormGroup;
 PasswordPattern =
  /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/

  isAuthenticationFailed:boolean;

  constructor(private fb:FormBuilder,private toastr: ToastrService,private router:Router){

  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.pattern(this.PasswordPattern)]],
      mobno: ['', [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
    })
    this.isAuthenticationFailed = false;
  }
  OnSubmit(){
    // this.signupForm.value
    console.log(this.signupForm.value);
    console.log(this.f['mobno'].valid,"mobile");
    if(this.signupForm.invalid){
      return;
    }
    if(this.signupForm.valid){
      let localdata = localStorage.getItem('signup-data'); //create a variable named localdata and get data from localstorage(lineno47)
      console.log(localdata,"userinformation");  
    
      if(localdata){                              //if localdata have any data execute if block
        let localdata_obj =  JSON.parse(localdata);   //create a variable named localdata_obj to store the data from getted localdata as object, here to convert string to obj  JSON.parse method used
        console.log(localdata_obj,'existing');
      
        let isUserExists=localdata_obj.find((data:any)=>data.email == this.signupForm.get('email')?.value);
        console.log(isUserExists,'exists')
        if(isUserExists){
          // this.toastr.error('Email already exist!');
          this.isAuthenticationFailed = true; 
        }
        else{
        console.log(typeof localdata_obj,'chektype');
        localdata_obj.push(this.signupForm.value); //push the new signupdata to array named localdata_obj variable
        console.log(localdata_obj,'afterpush');
        localStorage.setItem('signup-data',JSON.stringify(localdata_obj)); //to set localdata_obj to localstorage as string because to send localdata_obj inJson format to the localstorage
        this.toastr.success("successfully registered",'success',{closeButton:true});
        this.router.navigate(['/login']);
      }
        
      
      }
      else{
             //if no value in localstorage set the firstuser signup-data in arrayformat
        localStorage.setItem('signup-data',JSON.stringify([this.signupForm.value])); //save or set the data geted from signupform, here we have datas as object localstorage allows only strings, so to convert object to string we used json.stringly method =>signup data is name of the data stored in local storage
        this.toastr.success("successfully registered",'success',{closeButton:true});
        this.router.navigate(['/login']);
      }
      
    }

  }
  get f(){
    return this.signupForm.controls
    
  }
  
}

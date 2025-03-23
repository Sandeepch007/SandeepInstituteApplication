import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink,RouterOutlet } from '@angular/router';
import { ForgotpasswordComponent } from '../forgotpassword/forgotpassword.component';
import { RegisterComponent } from '../register/register.component';
import { Login } from '../models/login';
import { WebaiService } from '../webai.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-userlogin',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,ForgotpasswordComponent,RegisterComponent,RouterLink,RouterOutlet],
  templateUrl: './userlogin.component.html',
  styleUrl: './userlogin.component.css'
})
export class UserloginComponent implements OnInit {
  isLoggedIn:boolean=false;
  loginid:string="";
  loginpage:Login[]=[];
  userlogin!:FormGroup;
  constructor(private fb:FormBuilder,private web:WebaiService,private router: Router,private cookieService:CookieService){}
  ngOnInit() {
    this.userlogin=this.fb.group({
      username:['',[Validators.required,Validators.minLength(5),Validators.maxLength(8)]],
      password:['',[Validators.required,Validators.minLength(3),Validators.maxLength(9)]]
    })
    
  }

  onlogin() {
    const loginForm = this.userlogin.value;
  
    // Call the login API
    this.web.logindata(loginForm).subscribe(
      (response: any) => {
        const loginId = response.loginid;
        const userName=response.username; // or response.loginid, depending on your API response structure

        // Store the login ID in a cookie
        this.cookieService.set('loginid', loginId, 1);
        this.cookieService.set('username', userName, 1);
        console.log('Username:', userName);
        console.log('Login ID:', loginId);
        this.router.navigate(['User/Master2/Forums']);
      },
      (error: any) => {
        // Show error message using SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error?.error || 'Failed to login', // Handle the error message from the backend or a default message
        });
      }
    );
  }
  
// npm install ngx-cookie-service@17 to save the cookievalue in userwelcome page

}

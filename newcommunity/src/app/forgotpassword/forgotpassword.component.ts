import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Securityquestions } from '../models/securityquestions.class';
import { WebaiService } from '../webai.service';
import Swal from 'sweetalert2';
import { title } from 'process';
import { text } from 'stream/consumers';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
export class ForgotpasswordComponent implements OnInit{
frgtpwd!:FormGroup;
securityQuestions:Securityquestions[]=[];
  constructor(private fb:FormBuilder,private web:WebaiService){
    this.web.getquestions().subscribe(
      (data: any) => {
        this.securityQuestions = data; // Assign API response
        
      }
    );

  }
  ngOnInit(): void {
    this.frgtpwd=this.fb.group({
      username:['',Validators.required],
      secquestion:['',Validators.required],
      secanswer:['',Validators.required]
    })
  }

  frgtpswd() {
    const frgtdata = this.frgtpwd.value; // Get form data
  
    this.web.forgtpswd(frgtdata).subscribe(
      (response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Password Retrieved',
          text: `Your password is: ${response}`, // Display the plain password
        })
          this.frgtpwd.reset(); // Reset the form after showing success message
        
      },
      (error: any) => {
        const errorMessage =
          error?.error || 'Failed to retrieve the password. Please try again.';
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage,
        });
      }
    );
  }
  
  
}

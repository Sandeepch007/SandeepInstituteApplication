import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Userregister } from '../models/userregister.class';
import Swal from 'sweetalert2';
import { WebaiService } from '../webai.service';
import { Securityquestions } from '../models/securityquestions.class';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  form!:FormGroup;
  securityQuestions:Securityquestions[]=[];
  constructor(private fb:FormBuilder,private web:WebaiService){
    this.web.getquestions().subscribe(
      (data: any) => {
        this.securityQuestions = data; // Assign API response
        
      }
    );

  }
  ngOnInit(){
    this.form=this.fb.group({
      
        fullname: ['',[ Validators.required,Validators.minLength(3),Validators.maxLength(9)]],
        username: ['', [ Validators.required,Validators.minLength(3),Validators.maxLength(9)]],
        password: ['', [ Validators.required,Validators.maxLength(9),Validators.minLength(3)]],
        secanswer: ['', [ Validators.required,Validators.minLength(3),Validators.maxLength(9)]],
        questionid: [''],
       
    })

  }
  onsubmit(){
    if (this.form.valid){
      this.insert();
    }
  }
  
  
  insert() {
    const formData = this.form.value;
  
    this.web.create(formData).subscribe({
      next: (response: any) => {
        // Handle success
        Swal.fire({
          icon: 'success',
          title: 'Form submitted successfully',
          text: 'User details added successfully',
          confirmButtonText: 'OK',
        });
        this.form.reset();
      },
      error: (error: any) => {
        if (error.status === 200 || error.status === 201) {
          // Treat it as success if status code indicates success
          Swal.fire({
            icon: 'success',
            title: 'Form submitted successfully',
            text: 'User details added successfully',
            confirmButtonText: 'OK',
          });
          this.form.reset();
        } else {
          // Handle actual errors
          Swal.fire({
            icon: 'error',
            title: 'Submission Failed',
            text: 'An error occurred while submitting the form. Please try again.',
            confirmButtonText: 'OK',
          });
        }
      },
    });
  }
  
    

  }
  






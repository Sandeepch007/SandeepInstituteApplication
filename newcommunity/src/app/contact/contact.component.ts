import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  revform!:FormGroup;
  constructor(private cont:ContactService,private fb:FormBuilder){}
  ngOnInit(): void {
    this.revform=this.fb.group({
      name:['',Validators.required],
      email:['',Validators.required],
      message:['',Validators.required]
    })
  }
  
  postreview(){
    const formrev=this.revform.value;
    this.cont.create(formrev).subscribe({
          next: (response: any) => {
            // Handle success
            Swal.fire({
              icon: 'success',
              title: 'Form submitted successfully',
              text: 'User details added successfully',
              confirmButtonText: 'OK',
            });
         this.revform.reset();
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



import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerform!:FormGroup;
  secques:any[]=[];
constructor(private fb:FormBuilder,private web:UserService){}
ngOnInit(): void {
  this.registerform=this.fb.group({
  username:['',Validators.required],
  password: ['',Validators.required],
  email: ['',[Validators.required,Validators.email]],
  hint: ['',Validators.required],
  phoneno:['',Validators.required],
  secquesid: [''],
  districtid:['',Validators.required]
  });

  
this.getquestion();
}

getquestion(){
  this.web.getallques().subscribe((data:any)=>{
    this.secques=data;
  })
}

postallusers(){
  const formdata=this.registerform.value;
  this.web.postusers(formdata).subscribe({
    next: (response: any) => {
      // Handle success
      Swal.fire({
        icon: 'success',
        title: 'Form submitted successfully',
        text: 'User details added successfully',
        confirmButtonText: 'OK',
      });
      this.registerform.reset();
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
        this.registerform.reset();
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

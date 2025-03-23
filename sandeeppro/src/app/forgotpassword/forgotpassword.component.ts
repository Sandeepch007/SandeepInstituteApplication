import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
export class ForgotpasswordComponent {
  frgtpwd!:FormGroup;
  securityQuestions:any[]=[];
    constructor(private fb:FormBuilder,private web:UserService){
      this.web.getallques().subscribe(
        (data: any) => {
          this.securityQuestions = data; // Assign API response
          
        }
      );
  
    }
    ngOnInit(): void {
      this.frgtpwd=this.fb.group({
        username:['',Validators.required],
        secquesname:[''],
        hint:['',Validators.required]
      })
    }
  
    forgotpswd() {
      const frgtdata = this.frgtpwd.value; // Get form data
    
      this.web.forgotpwd(frgtdata).subscribe(
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

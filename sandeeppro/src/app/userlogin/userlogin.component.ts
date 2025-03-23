import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule,FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink,RouterOutlet} from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../user.service';


@Component({
  selector: 'app-userlogin',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterOutlet,RouterLink],
  templateUrl: './userlogin.component.html',
  styleUrl: './userlogin.component.css'
})
export class UserloginComponent implements OnInit {
  loginform!:FormGroup
message:string='';
  constructor(private fb:FormBuilder,private web:UserService,private router:Router){}
ngOnInit(): void {
  this.loginform=this.fb.group({
username:['',Validators.required],
password:['',Validators.required]
  })
}

onlogin() {
  const login = this.loginform.value;

  // Call the login API
  this.web.logindata(login).subscribe(
    (response: any) => {
      this.message = response?.message || 'Login successful';
      
      
     
      Swal.fire({
        icon: 'success',
        title: 'Successfully logged in!',
        text: this.message,
      });

      // Navigate to user forums
      this.router.navigate(['login/details']);
    },
    (error: any) => {
      const errorMessage = error?.error?.message || error?.message || 'Failed to login';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
      });
    }
  );
}



}

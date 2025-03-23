import { Component, OnInit } from '@angular/core';
import { ForgotpwdComponent } from '../forgotpwd/forgotpwd.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-hospital-login',
  standalone: true,
  imports: [ForgotpwdComponent,RouterLink,RouterOutlet,CommonModule,ReactiveFormsModule],
  templateUrl: './hospital-login.component.html',
  styleUrl: './hospital-login.component.css'
})
export class HospitalLoginComponent implements OnInit {
loginform!:FormGroup;
constructor(private fb:FormBuilder,private router:Router){

}
ngOnInit(): void {
  this.loginform=this.fb.group({
    userRole:['',[Validators.required]],
    identifier: ['', [Validators.required, this.validateIdentifier]],
    password: ['',[Validators.required, Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
      ]
    ]
  })
}
validateIdentifier(control: any) {
  const value = control.value;
  if (!value) return { invalid: true };

  // Regular expressions for validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;       // Matches email format
  const usernamePattern = /^[a-zA-Z0-9_]{4,}$/;           // Matches username (at least 4 characters)
  const registerIdPattern = /^[a-zA-Z0-9]{6,12}$/;        // Matches alphanumeric Register ID (6-12 characters)

  if (emailPattern.test(value) || usernamePattern.test(value) || registerIdPattern.test(value)) {
    return null; // Valid input
  }

  return { invalid: true }; // Invalid input
}

login() {
  const username = this.loginform.value.identifier;
  const password = this.loginform.value.password;
  const userRole = this.loginform.value.userRole;

  console.log('Entered Username:', username);
  console.log('Entered Password:', password);
  console.log('Selected Role:', userRole);

  if (username === 'sandeep' && password === 'Sandeep@1234') {
    if (typeof window !== 'undefined') {
      localStorage.setItem('userRole', userRole); // Store user role only in browser
    }

    if (userRole === 'admin') {
      console.log('Navigating to admin dashboard...');
      this.router.navigate(['/admin/dashboard']);
    } else if (userRole === 'doctor') {
      console.log('Navigating to doctor dashboard...');
      this.router.navigate(['/doctor/dashboard']);
    } else if (userRole === 'patient') {
      console.log('Navigating to patient dashboard...');
      this.router.navigate(['/patient/dashboard']);
    } else {
      alert('Invalid role selected');
    }
  } else {
    alert('Invalid username or password');
  }
}



// login() {
//   this.authService.login(this.username, this.password).subscribe((user: any) => {
//     if (user.role === 'admin') {
//       this.router.navigate(['/admin/dashboard']);
//     } else if (user.role === 'doctor') {
//       this.router.navigate(['/doctor/dashboard']);
//     } else if (user.role === 'patient') {
//       this.router.navigate(['/patient/dashboard']);
//     }
//   });
// }


}

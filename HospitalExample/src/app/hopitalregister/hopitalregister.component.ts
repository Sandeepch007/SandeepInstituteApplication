import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HospitalService } from '../hospital.service';
import { SecQues } from '../Models/sec-ques';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-hopitalregister',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './hopitalregister.component.html',
  styleUrl: './hopitalregister.component.css'
})
export class HopitalregisterComponent implements OnInit {
  form!:FormGroup;
  securityQuestions:SecQues[]=[];
  previewData: any = {};

  @ViewChild('previewModal') previewModal!: ElementRef; // For modal reference

  countryCodes = [
    { label: '+91 (India)', value: '+91' },
    { label: '+1 (USA)', value: '+1' },
    { label: '+44 (UK)', value: '+44' },
    { label: '+61 (Australia)', value: '+61' },
    { label: '+81 (Japan)', value: '+81' }
  ];
  modalService: any;
  constructor(private fb: FormBuilder,private samp:HospitalService) {
    this.form = this.fb.group({
      firstname: ['', Validators.required],
      middlename: [''],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      countryCode: ['+91', Validators.required], // Default: India
      phone: [
        '', 
        [Validators.required, Validators.pattern('^[0-9]{10}$')] // Only 10 digits allowed
      ],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
        ]
      ],
      confirmPassword: ['', Validators.required],
      userRole: ['', Validators.required],
      secId: ['', Validators.required],
      securityAnswer: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(10)]],
    });
    
  }

  passwordMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
ngOnInit(): void {
  this.getquestions();
}
getquestions(){
  this.samp.getques().subscribe((data:any)=>{
    this.securityQuestions=data;
  })
}
previewDataFunc() {
  if (this.form.valid) {
    this.previewData = {
      ...this.form.value,
      phone: this.form.value.phone.replace(/.(?=.{4})/g, '*'), // Mask all except last 4 digits
      email: this.maskEmail(this.form.value.email) // Mask email
    };
    this.modalService.open(this.previewModal, { size: 'lg', backdrop: 'static' }); // Open modal
  }
}

// Mask email function (hide first part, show domain)
maskEmail(email: string): string {
  const emailParts = email.split('@');
  return emailParts[0].substring(0, 2) + '*****' + '@' + emailParts[1];
}


submitData() {
  const finalData = { 
    ...this.form.value, 
    phone: this.form.value.countryCode + this.form.value.phone // Store full phone number
  };

  this.samp.postreg(finalData).subscribe(response => {
    Swal.fire({
      icon: 'success',
      title: 'Registration Successful!',
      text: 'Your data has been submitted successfully.',
      confirmButtonText: 'OK'
    });
    this.modalService.dismissAll(); // Close modal after submitting
    this.form.reset();
  },
  error => {
    Swal.fire({
      icon: 'error',
      title: 'Oops!',
      text: 'Something went wrong. Please try again.',
      confirmButtonText: 'OK'
    });
    this.modalService.dismissAll(); // Close modal after submitting
    this.form.reset();
  });
}
}

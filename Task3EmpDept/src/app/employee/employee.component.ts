import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule,FormGroup,Validators } from '@angular/forms';
import { Dept } from '../Models/dept';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
form!:FormGroup;
lstdepts:Dept[]=[];
isEditmode=false;
departments:Dept[]=[];
constructor(private fb:FormBuilder){}
ngOnInit(): void {
  this.form=this.fb.group({
      empno: [''],
      empName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]+$')]],
      empSalary: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      empDate: [null, [Validators.required]],
      empDob: [null, [Validators.required]],
      empAadharNo: ['', [Validators.required, Validators.pattern('^[2-9]{1}[0-9]{11}$')]],  // 12-digit Aadhar
      empLocation: ['', [Validators.required]],
      empPincode: ['', [Validators.required, Validators.pattern('^[1-9][0-9]{5}$')]],  // 6-digit pincode
      empEmailId: ['', [Validators.required, Validators.email]],
      empPassportNo: ['', [Validators.required, Validators.pattern('^[A-Z][0-9]{7}$')]],  // Indian passport format
      empGender: ['', [Validators.required]],
      deptId: [0, [Validators.required, Validators.min(1)]]
  })
}

}

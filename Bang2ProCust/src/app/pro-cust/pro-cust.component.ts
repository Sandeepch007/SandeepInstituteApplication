import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProCust } from '../Model/pro-cust';
import { SampleService } from '../sample.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pro-cust',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './pro-cust.component.html',
  styleUrl: './pro-cust.component.css'
})
export class ProCustComponent {
  form!:FormGroup; 
  isEditMode=false;
 lstprocusts:ProCust[]=[];
 cust:ProCust=new ProCust();
 constructor(private fb:FormBuilder,private sample:SampleService){
   this.getproducts();
 } 
 ngOnInit(){ 
   this.form=this.fb.group({ 
     productId:[''],
     productName: ['', [Validators.required,Validators.maxLength(100)]],
     proDescription: ['', [Validators.required,Validators.maxLength(100)]],
     price: ['', [Validators.required,Validators.min(1)]],
     quantity: ['', [Validators.required,Validators.min(1)]],
     custId: ['', [Validators.required, Validators.min(1)]], // Must be greater than 0
      custName: ['', [Validators.required, Validators.minLength(3)]], // At least 3 characters
      custLocation: ['', Validators.required],
      custPhone: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')], // 10-digit phone number
      ],
      custEmailId: [
        '',
        [Validators.required, Validators.email], // Valid email format
      ],
      custAadharCard: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{12}$')], // 12-digit Aadhar
      ],
      custPassport: [
        '',
        [Validators.required, Validators.pattern('^[A-Z][0-9]{7}$')], // Format: 1 letter + 7 digits
      ],
     
       
   }) 

 } 

 onaction(){
  if (this.isEditMode){ 
    this.isEditMode=false;
    this.form.reset(); 
  } 
  else{
    this.form.reset();
  }
 }
 onsubmit(){ 
   if (this.isEditMode){ 
     this.update(); 
   } 
   else{
     this.insert();
   }
 } 


 editData(productId: number): void { 
   this.getDataForEdit(productId);
   this.showPopups(); 
   this.isEditMode = true;
}

getDataForEdit(productId: number): void { 
   this.cust = this.lstprocusts.find(item => item.productId === productId) ?? new ProCust(); 
}

showPopups(): void { 
   if (!this.cust) {
       console.error("No customer data found");
       return;
   }

   this.form.patchValue({ 
       productId: this.cust.productId || null,   
       productName: this.cust.productName || '',      
       proDescription: this.cust.proDescription || '',
       price: this.cust.price || '',
       quantity: this.cust.quantity || null,
       custId:this.cust.custId,
      custName:this.cust.custName,
      custLocation:this.cust.custLocation,
      custPhone:this.cust.custPhone,
      custEmailId:this.cust.custEmailId,
      custAadharCard:this.cust.custAadharCard,
      custPassport:this.cust.custPassport 
   }); 
}

  
  
 insert() { 
   const formData = this.form.value; 
  delete formData.productId;
   this.sample.postpro(formData).subscribe({ 
     next: (response: any) => { 
       Swal.fire({ 
         icon: 'success', 
         title: 'Form submitted successfully', 
         text: 'User details added successfully', 
         confirmButtonText: 'OK', 
       }); 
       this.form.reset(); 
       this.getproducts();
     }, 
     error: (error: any) => { 
       if (error.status === 200 || error.status === 201) { 
         Swal.fire({ 
           icon: 'success', 
           title: 'Form submitted successfully', 
           text: 'User details added successfully', 
           confirmButtonText: 'OK', 
         }); 
         this.form.reset(); 
         this.getproducts();
       } else {  
         Swal.fire({ 
           icon: 'error', 
           title: 'Submission Failed', 
           text: 'please fill all the fields while submitting the form. Please try again.', 
           confirmButtonText: 'OK', 
         }); 
       } 
     }, 
   }); 
 } 
  

 getproducts(){
   this.sample.getpros().subscribe((data:any)=>{
     this.lstprocusts=data;
   })

   
 }
 delete(id: any) {
   Swal.fire({
     title: 'Are you sure?',
     text: `Do you really want to delete the user with ID ${id}?`,
     icon: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#d33',
     cancelButtonColor: '#3085d6',
     confirmButtonText: 'Yes, delete it!',
     cancelButtonText: 'Cancel',
   }).then((result) => {
     if (result.isConfirmed) {
       this.sample.deletepro(id).subscribe(
         (response: any) => {  
           Swal.fire({
             icon: 'success',
             title: 'User Deleted Successfully',
             text: response,
             confirmButtonText: 'OK',
           });
           this.getproducts();
         }
       );
         }
         (error: any) => {
           Swal.fire({
             icon: 'error',
             title: 'Deletion Failed',
             text: 'An error occurred while deleting the user.',
             confirmButtonText: 'OK',
           });
          
     }
   });
 }
 
   
 update() {
   const sand = this.form.value;
   this.sample.updatepro(sand).subscribe(
     (response: any) => { 
       
       Swal.fire({
         icon: 'success',
         title: 'Updated Successfully',
         text: response,
         confirmButtonText: 'OK',
       });
       this.form.reset();
       this.getproducts();
     }
     ,
     (error: any) => {
       Swal.fire({
         icon: 'error',
         title: 'Update Failed',
         text: 'An error occurred while updating.',
         confirmButtonText: 'OK',
       });
       this.getproducts();
     }
   );
 }
 
 
}

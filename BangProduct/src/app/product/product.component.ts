import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../Model/product';
import { SampleService } from '../sample.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  form!:FormGroup; 
   isEditMode=false;
  lstproducts:Product[]=[];
  cust:Product=new Product();
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
      
        
    }) 
 
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
    this.cust = this.lstproducts.find(item => item.productId === productId) ?? new Product(); 
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
            text: 'An error occurred while submitting the form. Please try again.', 
            confirmButtonText: 'OK', 
          }); 
        } 
      }, 
    }); 
  } 
   

  getproducts(){
    this.sample.getpros().subscribe((data:any)=>{
      this.lstproducts=data;
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

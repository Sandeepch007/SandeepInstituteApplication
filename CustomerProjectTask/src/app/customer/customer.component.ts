import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { SampleService } from '../sample.service';
import { Customer } from '../Model/customer';
@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  form!:FormGroup; 
  citys:any[]=[];
  searchText:any='';
  filtered:any[]=[];
   isEditMode=false;
  lstcustomers:Customer[]=[];
  cust:Customer=new Customer();
  constructor(private fb:FormBuilder,private sample:SampleService){
    this.getcity();
    this.getcustomers();
  } 
  ngOnInit(){ 
    this.form=this.fb.group({ 
      customerId:[''],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      city: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]]
        
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


  editData(customerId: number): void { 
    this.getDataForEdit(customerId);
    this.showPopups(); 
    this.isEditMode = true;
}

getDataForEdit(customerId: number): void { 
    this.cust = this.lstcustomers.find(item => item.customerId === customerId) ?? new Customer(); 
}

showPopups(): void { 
    if (!this.cust) {
        console.error("No customer data found");
        return;
    }

    this.form.patchValue({ 
        customerId: this.cust.customerId || null,   
        firstName: this.cust.firstName || '',      
        middleName: this.cust.middleName || '',
        lastName: this.cust.lastName || '',
        dateOfBirth: this.cust.dateOfBirth || null,
        gender: this.cust.gender || '',
        city: this.cust.city || '',
        phone: this.cust.phone || '',
        email: this.cust.email || '',   
    }); 
}

   
   
  insert() { 
    const formData = this.form.value; 
   delete formData.customerId;
    this.sample.custpost(formData).subscribe({ 
      next: (response: any) => { 
        Swal.fire({ 
          icon: 'success', 
          title: 'Form submitted successfully', 
          text: 'User details added successfully', 
          confirmButtonText: 'OK', 
        }); 
        this.form.reset(); 
        this.getcustomers();
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
          this.getcustomers();
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
   getcity(){
  this.sample.getcity().subscribe( 
    (data: any) => { 
      this.citys = data;  
       
    } )

  }

  getcustomers(){
    this.sample.getcustomer().subscribe((data:any)=>{
      this.lstcustomers=data;
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
        this.sample.deletecust(id).subscribe(
          (response: any) => {  
            Swal.fire({
              icon: 'success',
              title: 'User Deleted Successfully',
              text: response,
              confirmButtonText: 'OK',
            });
            this.getcustomers();
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
    this.sample.updatecust(sand).subscribe(
      (response: any) => { 
        
        Swal.fire({
          icon: 'success',
          title: 'Updated Successfully',
          text: response,
          confirmButtonText: 'OK',
        });
        this.form.reset();
        this.getcustomers();
      }
      ,
      (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: 'An error occurred while updating.',
          confirmButtonText: 'OK',
        });
        this.getcustomers();
      }
    );
  }
  
  

  // onSearch() { 
  //   const searchTextTrimmed = this.searchText.trim(); 
 
  //   if (searchTextTrimmed.length >= 2) { 
  //     const searchTextLower = searchTextTrimmed.toLowerCase(); 
  //     this.filtered = this.lstcustomers.filter((cust: any) => { 
  //       const firstName = cust.firstName ? cust.firstName.toLowerCase() : ''; 
        
 
  //       return ( 
  //         firstName.includes(searchTextLower) 
  //       ); 
  //     }); 
  //   } else { 
  //     this.filtered = [...this.lstcustomers]; 
  //   } 
  // } 
 
   
  // clearSearch() { 
  //   this.searchText = '';
  //   this.filtered = [...this.lstcustomers]; 
  // }
















}

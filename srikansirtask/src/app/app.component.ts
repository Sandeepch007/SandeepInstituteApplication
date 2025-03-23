import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ProService } from './pro.service';
import Swal from 'sweetalert2';
import { Products } from './model/products';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'srikansirtask';
  proform!:FormGroup;
  Categories:any=[];
  pros:any[]=[];
  constructor(private fb:FormBuilder,private pro:ProService){
    this.getcat();
    this.getproducts();
  }
  ngOnInit(): void {
    this.proform=this.fb.group({
      productName:['',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
    productPrice:['',[Validators.required,Validators.minLength(2),Validators.maxLength(10)]],
    quantity:['',[Validators.required,Validators.minLength(1),Validators.maxLength(3)]],
    totalPrice:['',Validators.required],
    productCode: ['',Validators.required],
    categoryId:['']
    })
    this.proform.valueChanges.subscribe(() => this.updateTotalPrice());
  }

  updateTotalPrice() {
    const price = this.proform.get('productPrice')?.value;
    const quantity = this.proform.get('quantity')?.value;

    // Only update if both fields have valid values
    if (price > 0 && quantity > 0) {
      this.proform.get('totalPrice')?.setValue(price * quantity, { emitEvent: false });
    } else {
      this.proform.get('totalPrice')?.setValue(null, { emitEvent: false }); // Reset if any field is empty
    }
  }
  

  getcat(){
    this.pro.getcategory().subscribe((data=>{
      this.Categories=data;
    }))
  }

  postproduct(){
    const prod=this.proform.value;
    this.pro.postpro(prod).subscribe(({ 
      next: (response: any) => { 
         
        // Handle success 
        Swal.fire({ 
          icon: 'success', 
          title: 'Form submitted successfully', 
          text: 'User details added successfully', 
          confirmButtonText: 'OK', 
        }); 
        this.proform.reset(); 
        this.getproducts();
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
          this.proform.reset(); 
          this.getproducts();
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
    })
    )}

    getproducts(){
      this.pro.getpro().subscribe((dat:any)=>{
        this.pros=dat;
      })
    }

}

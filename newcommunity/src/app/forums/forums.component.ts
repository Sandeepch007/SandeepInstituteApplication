import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ForumService } from '../forum.service';
import Swal from 'sweetalert2';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormBuilder,FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Postquerry } from '../models/postquerry';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-forums',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterLink,ReactiveFormsModule],
  templateUrl: './forums.component.html',
  styleUrl: './forums.component.css'
})
export class ForumsComponent implements OnInit {
  loginid: number = 0;
  isEditMode: boolean = false; 
  showPopupModal: boolean = false;
  postques!:FormGroup;
  lstforums:Postquerry[]=[];
  postq: Postquerry=new Postquerry();
  constructor(private form:ForumService,private fb:FormBuilder,private cookieService:CookieService,private router:Router){}
  ngOnInit(): void {
    this.getformdata();
    this.postques=this.fb.group({
    questionId:[''],
    question:['',Validators.required],
    loginId:[''],
   
    
        })
  }
  getformdata(){
    this.form.getforums().subscribe((data:any)=>{
      this.lstforums=data;
    })
  }

  deleteForum(id: string): void {
    this.form.delforum(id).subscribe(
      (response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Deleted',
          text: response, // Display the server response in the SweetAlert
        });
        this.getformdata();
      },
      (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error?.error || 'Failed to delete the record', // Show error message
        });
      }
    );
    this.getformdata();
  }
  
   // Method to show the popup
   showPopup(): void {
    this.showPopupModal = true;
    this.isEditMode=false;
  }

  // Method to close the popup without saving
  closePopup(): void {
    this.showPopupModal = false;
     this.postques.reset(); // Reset the form if canceled
  }
  editData(questionId: number): void {
    this.getDataForEdit(questionId);  // Fetch data from list and transfer to class
    this.getformdata();
  }

  // Method to get data for editing from the list and transfer to class
  getDataForEdit(questionId: number): void {
    this.postq = this.lstforums.find(item => item.questionId === questionId)?? new Postquerry(); // Find the selected item
    this.showPopups(true);  // Show the popup in Edit Mode
    this.getformdata();
  }

  // Method to show the popup and set up for edit mode
  showPopups(isEdit: boolean = false): void {
    this.showPopupModal = true;
    this.isEditMode = isEdit;

    if (isEdit && this.postq) {
      this.postques.patchValue({
        questionId: this.postq.questionId,  // Pre-fill the questionId field
        question: this.postq.question,      // Pre-fill the question field
        loginId: this.postq.loginId         // Pre-fill the loginId field
      });
    }
  }

  insertforum(){
    const sand=this.postques.value;
     // Retrieve the loginid from the cookie
     const loginid = this.cookieService.get('loginid');
    
     // Add the loginid to the form data (sand)
     sand.loginId = loginid; 
    
    
    delete sand.questionId;
    this.form.postforum(sand).subscribe({
          next: (response: any) => {
            this.showPopupModal = false;
            // Handle success
            Swal.fire({
              icon: 'success',
              title: 'Form submitted successfully',
              text: 'User details added successfully',
              confirmButtonText: 'OK',
            });
            this.postques.reset();
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
              this.postques.reset();
              this.getformdata();
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
        this.getformdata();
  }

  updateforum(){
    const obj=this.postques.value;
this.form.updateforums(obj).subscribe(
  (response: any) => {
    Swal.fire({
      icon: 'success',
      title: 'updated',
      text: response, // Display the server response in the SweetAlert
    });
    this.getformdata();
  },
  (error: any) => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error?.error || 'Failed to update the record', // Show error message
    });
  }
);
this.getformdata();
  }

onsubmit(){
 
  if (this.isEditMode) {
    // Call update method if in edit mode
    this.updateforum();
  } else {
    // Call insert method if not in edit mode
    this.insertforum();
  }
}

onselect(questionId: number): void {
  const selectedQuestion = this.lstforums.find(item => item.questionId === questionId) ?? new Postquerry();

  const questionData = {
    questionId: selectedQuestion.questionId,
    question: selectedQuestion.question,
  };

  this.form.setForums(questionData); // Store the data in the service
  this.router.navigate(['User/Master2/Forums/reply']); // Navigate to the next component
}





}


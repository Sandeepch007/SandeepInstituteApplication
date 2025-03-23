import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForumService } from '../forum.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';
import { Reply } from '../models/reply';

@Component({
  selector: 'app-replyforum',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './replyforum.component.html',
  styleUrl: './replyforum.component.css'
})
export class ReplyforumComponent {
  isEditMode: boolean = false; 
  showPopupModal: boolean = false;
  postquess!: FormGroup;
  editForm!: FormGroup;
  lstreply:Reply[]=[];
    greply: Reply=new Reply();
 
  constructor(private fb: FormBuilder, private form: ForumService,private cookieService:CookieService) {
    
this.getreply();
  }

  ngOnInit(): void {
    // Initialize the form
    this.postquess = this.fb.group({
      question: [''],
      reply:['', Validators.required],
      questionId: [''], // Hidden field for questionId
      loginId: [''], // Hidden field for loginId
    });

    // Retrieve data from the service
    const selectedQuestion = this.form.getStoredForum();
    this.cookieService.set('questionid', selectedQuestion.questionId, 1);
    if (selectedQuestion) {
      // Populate the form with the retrieved data
      this.postquess.patchValue({
        question: selectedQuestion.question,
      });
    } else {
      console.error('No data found!');
      // Optionally handle missing data, such as navigating back or showing an error message
    }

    

  
    this.editForm = this.fb.group({
      replyId: [''],
      reply: ['', Validators.required], // Field for Reply
      questionId: [''],
      loginId: [''],
    });
  

  }

  insertreply() {
    const rplydata = this.postquess.value;
    const loginid = this.cookieService.get('loginid');
    const questionid = this.cookieService.get('questionid');
    console.log('Login ID:', loginid);
    console.log('Question ID:', questionid);
    rplydata.questionId=questionid;
    rplydata.loginId = loginid;
    delete rplydata.question;
    
this.form.replyforumpost(rplydata).subscribe({
          next: (response: any) => {
            
            // Handle success
            Swal.fire({
              icon: 'success',
              title: 'Form submitted successfully',
              text: 'User details added successfully',
              confirmButtonText: 'OK',
            });
            this.postquess.reset();
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
              this.postquess.reset();
              
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
  
    }



    getreply(){
      this.form.replyget().subscribe((data:any)=>{
        this.lstreply=data;
      })
    }


    editData(replyid: number): void {
        this.getDataForEdit(replyid);  // Fetch data from list and transfer to class
        this.getreply();
      }
    
      // Method to get data for editing from the list and transfer to class
      getDataForEdit(replyid: number): void {
        this.greply = this.lstreply.find(item => item.replyId === replyid)?? new Reply(); // Find the selected item
        this.showPopups(true);
        this.getreply();
      }

      showPopups(isEdit: boolean = false): void {
        this.showPopupModal = true;
        this.isEditMode = isEdit;
    
        if (isEdit && this.greply) {
          this.editForm.patchValue({
            replyId: this.greply.replyId,
            reply: this.greply.reply,  // Pre-fill the questionId field
            questionId:this.greply.forum?.questionId || '',   // Pre-fill the loginId field
            loginId:this.greply.forum?.loginId || '',
          });
        }
      }

      closePopup(): void {
        this.showPopupModal = false;
         this.editForm.reset(); // Reset the form if canceled
      }

      showPopup(): void {
        this.showPopupModal = true;
        this.isEditMode=false;
      }
      updateReply(){
        const obj=this.editForm.value;
        this.form.replyupdate(obj).subscribe(
          (response: any) => {
            Swal.fire({
              icon: 'success',
              title: 'updated',
              text: response, // Display the server response in the SweetAlert
            });
            this.getreply();
            this.editForm.reset();
          },
          (error: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: error?.error || 'Failed to update the record', // Show error message
            });
          }
        );
        this.getreply();

      }

      deletereply(id: any): void {
          this.form.replydelete(id).subscribe(
            (response: any) => {
              Swal.fire({
                icon: 'success',
                title: 'Deleted',
                text: response, // Display the server response in the SweetAlert
              });
              this.getreply();
            },
            (error: any) => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error?.error || 'Failed to delete the record', // Show error message
              });
            }
          );
          this.getreply();
        }
    
  }
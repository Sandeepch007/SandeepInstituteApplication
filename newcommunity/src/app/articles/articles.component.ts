import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Article } from '../models/article';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent implements OnInit {
  filteredArticles: any[] = [];
  searchText:string='';
  isEditMode: boolean = false; 
  showPopupModal: boolean = false;
  artinsert!:FormGroup;
  articles:Article[]=[];
  aart:Article=new Article();
  constructor(private art:ArticleService,private fb:FormBuilder,private cookieService:CookieService){}

ngOnInit(): void {
  this.getarticle();
  this.artinsert=this.fb.group({
    articleType:['',Validators.required],
    articleDescripstion:['',Validators.required],
    articleId:[''],
    loginId:['']
  })
}
getarticle(){
  this.art.getarticles().subscribe((data:any)=>{
this.articles=data;
this.filteredArticles = [...this.articles];
  })
}
articlepost(obj:any){
  const artic=this.artinsert.value;
  this.art.postarticle(artic).subscribe()
}
 // Method to show the popup
   showPopup(): void {
    this.showPopupModal = true;
    this.isEditMode=false;
  }

  // Method to close the popup without saving
  closePopup(): void {
    this.showPopupModal = false;
     this.artinsert.reset(); // Reset the form if canceled
  }
  editData(questionId: number): void {
    this.getDataForEdit(questionId);  // Fetch data from list and transfer to class
    this.getarticle();
  }

  // Method to get data for editing from the list and transfer to class
  getDataForEdit(articleId: number): void {
    this.aart = this.articles.find(item => item.articleId === articleId)?? new Article(); // Find the selected item
    this.showPopups(true);  // Show the popup in Edit Mode
    this.getarticle();
  }

  // Method to show the popup and set up for edit mode
  showPopups(isEdit: boolean = false): void {
    this.showPopupModal = true;
    this.isEditMode = isEdit;

    if (isEdit && this.aart) {
      this.artinsert.patchValue({
       articleId: this.aart.articleId,  // Pre-fill the questionId field
        articleType: this.aart.articleType,      // Pre-fill the question field
        articleDescripstion:this.aart.articleDescripstion,
        loginId: this.aart.loginId         // Pre-fill the loginId field
      });
    }
  }

  insertarticle(){
    const sand=this.artinsert.value;
     // Retrieve the loginid from the cookie
     const loginid = this.cookieService.get('loginid');
    
     // Add the loginid to the form data (sand)
     sand.loginId = loginid; 
    
    
    delete sand.articleId;
    this.art.postarticle(sand).subscribe({
          next: (response: any) => {
            this.showPopupModal = false;
            // Handle success
            Swal.fire({
              icon: 'success',
              title: 'Form submitted successfully',
              text: 'User details added successfully',
              confirmButtonText: 'OK',
            });
            this.artinsert.reset();
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
              this.artinsert.reset();
              this.getarticle();
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
        this.getarticle();
  }

  updatearticles(){
    const obj=this.artinsert.value;
this.art.updatearticle(obj).subscribe(
  (response: any) => {
    Swal.fire({
      icon: 'success',
      title: 'updated',
      text: response, // Display the server response in the SweetAlert
    });
    this.getarticle();
  },
  (error: any) => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error?.error || 'Failed to update the record', // Show error message
    });
  }
);
this.getarticle();
  }

onsubmit(){
 
  if (this.isEditMode) {
    // Call update method if in edit mode
    this.updatearticles();
  } else {
    // Call insert method if not in edit mode
    this.insertarticle();
  }
}


deletearticle(id: any): void {
          this.art.articledelete(id).subscribe(
            (response: any) => {
              Swal.fire({
                icon: 'success',
                title: 'Deleted',
                text: response, // Display the server response in the SweetAlert
              });
              this.getarticle();
            },
            (error: any) => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error?.error || 'Failed to delete the record', // Show error message
              });
            }
          );
          this.getarticle();
        }

// for search article point of view
        onSearch() {
          const searchTextTrimmed = this.searchText.trim();
      
          if (searchTextTrimmed.length >= 2) {
            const searchTextLower = searchTextTrimmed.toLowerCase();
            this.filteredArticles = this.articles.filter((article: any) => {
              const articleType = article.articleType ? article.articleType.toLowerCase() : '';
              const articleDescription = article.articleDescripstion ? article.articleDescripstion.toLowerCase() : '';
      
              return (
                articleType.includes(searchTextLower) ||
                articleDescription.includes(searchTextLower)
              );
            });
          } else {
            this.filteredArticles = [...this.articles]; // Reset to all articles if search text is less than 2 characters
          }
        }
      
        // Clear search method
        clearSearch() {
          this.searchText = ''; // Clear the search input
          this.filteredArticles = [...this.articles]; // Reset filteredArticles to show all articles
        }
}


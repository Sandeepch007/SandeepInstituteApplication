import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  reviews:any[]=[];
  constructor(private cont:ContactService){}
  ngOnInit(): void {
    this.getreviews();
  }
  getreviews(){
    this.cont.getquestions().subscribe((data:any)=>{
this.reviews=data;
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-userslist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './userslist.component.html',
  styleUrl: './userslist.component.css'
})
export class UserslistComponent implements OnInit {
  userlist:any[]=[];
constructor(private web:UserService){}

ngOnInit(): void {
  this.getusers();
}
getusers(){
  this.web.getuserslist().subscribe((data:any)=>{
    this.userlist=data;
  });
};



}


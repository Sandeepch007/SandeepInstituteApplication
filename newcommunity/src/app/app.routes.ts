import { Routes } from '@angular/router';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { HomeComponent } from './home/home.component';
import { ArticlesComponent } from './articles/articles.component';
import { ForumsComponent } from './forums/forums.component';
import { ProjectsComponent } from './projects/projects.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { RegisterComponent } from './register/register.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { Masterpage2Component } from './masterpage2/masterpage2.component';
import { ReplyforumComponent } from './replyforum/replyforum.component';


export const routes: Routes = [
    {path:"home",component:HomeComponent},
    {path:"Admin",component:AdminloginComponent},
    { 
        path: 'User/Master2', 
        component: Masterpage2Component,
        children: [
          { path: 'Articles', component: ArticlesComponent },
          { path: 'Forums', component: ForumsComponent },
          { path: 'Forums/reply', component: ReplyforumComponent },
          { path: 'Projects', component: ProjectsComponent },
        ]
      },
    {path:"User/register",component:RegisterComponent},
    {path:"User/frgtpwd",component:ForgotpasswordComponent},
    {path:"User",component:UserloginComponent},
    {path:"about",component:AboutComponent},
    {path:"contact",component:ContactComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full' }
    
];

import { Routes } from '@angular/router';
import { UserloginComponent } from './userlogin/userlogin.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { UserslistComponent } from './userslist/userslist.component';

export const routes: Routes = [
    {path:'',component:UserloginComponent},
    {path:'login',component:UserloginComponent},
    {path:'logout',component:LogoutComponent},
    {path:'login/register',component:RegisterComponent},
    {path:'login/forgotpwd',component:ForgotpasswordComponent},
    {path:'login/details',component:UserslistComponent}
];

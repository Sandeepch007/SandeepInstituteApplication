import { Routes } from '@angular/router';
import { HospitalLoginComponent } from './hospital-login/hospital-login.component';
import { HospitalHomeComponent } from './hospital-home/hospital-home.component';
import { AdminComponent } from './admin/admin.component';
import { authguardGuard } from './authguard.guard';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AdminusersComponent } from './adminusers/adminusers.component';
import { DoctordashboardComponent } from './doctordashboard/doctordashboard.component';
import { DoctorComponent } from './doctor/doctor.component';
import { DoctorpatientsComponent } from './doctorpatients/doctorpatients.component';
import { PatientComponent } from './patient/patient.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { PatientAppointmentsComponent } from './patient-appointments/patient-appointments.component';
import { HopitalregisterComponent } from './hopitalregister/hopitalregister.component';
import { ForgotpwdComponent } from './forgotpwd/forgotpwd.component';
import { ContactComponent } from './contact/contact.component';
import { Masterpage1Component } from './masterpage1/masterpage1.component';
export const routes: Routes = [
{path:'',component:Masterpage1Component,children:[
    {path:'login',component:HospitalLoginComponent},
    {path:'login/register',component:HopitalregisterComponent},
    {path:'contact',component:ContactComponent},
    {path:'',component:HospitalHomeComponent},
    {path:'login/forgot',component:ForgotpwdComponent},
]},
    
    {path:'admin',component:AdminComponent,canActivate:[authguardGuard],children:[
        {path:'dashboard',component:AdmindashboardComponent},
        {path:'users',component:AdminusersComponent}
    ]},
    {path:'doctor',component:DoctorComponent,canActivate:[authguardGuard],children:[
        {path:'dashboard',component:DoctordashboardComponent},
        {path:'patients',component:DoctorpatientsComponent}
    ]},
    {path:'patient',component:PatientComponent,canActivate:[authguardGuard],
        children:[
            {path:'dashboard',component:PatientDashboardComponent},
            {path:'appointment',component:PatientAppointmentsComponent}
        ]
    },
];

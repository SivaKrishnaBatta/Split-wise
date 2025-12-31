import { Routes } from '@angular/router';
import { Register } from './auth/register/register';
import { OtpComponent } from './auth/otp/otp';

export const routes: Routes = [
      { path: '', redirectTo: 'otp', pathMatch: 'full' }, 
    {path:'register', component:Register},
    {path:'otp',component:OtpComponent},
];

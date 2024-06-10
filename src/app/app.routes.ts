import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { AboutUsComponent } from './Components/aboutUs/about-us.component';
import { ProductsComponent } from './Components/products/products.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { LoginComponent } from './Components/login/login.component';
import { CartComponent } from './Components/cart/cart.component'
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';

export const routes: Routes = [
    {path:'homepage',component:HomeComponent},
    {path:'', redirectTo: 'homepage', pathMatch: 'full'},
    {path:'aboutpage',component:AboutUsComponent},
    {path:'products',component:ProductsComponent},
    {path:'contact',component:ContactUsComponent},
    {path:'login',component:LoginComponent},
    {path:'cart',component:CartComponent},
    {path:'signup',component:SignUpComponent},
    {path:'forget',component:ForgetPasswordComponent}

];

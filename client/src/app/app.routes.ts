import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ListBookingsComponent } from './pages/booking/list-bookings/list-bookings.component';
import { ListServicesComponent } from './pages/service/list-services/list-services.component';
import { ListCustomersComponent } from './pages/customer/list-customers/list-customers.component';
import { authGuard } from './guards/auth.guard';


export const routes: Routes = [
   { path: '', redirectTo: 'bookings', pathMatch: 'full' },

   { path: 'login', component: LoginComponent },
   
   { path: 'register', component: RegisterComponent },

   { path: 'bookings', component: ListBookingsComponent, canActivate: [authGuard] },

   { path: 'customers', component: ListCustomersComponent, canActivate: [authGuard] },

   { path: 'services', component: ListServicesComponent, canActivate: [authGuard] },

   { path: '**', redirectTo: 'bookings' }
];

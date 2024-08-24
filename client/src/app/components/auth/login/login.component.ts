import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserI } from '../../../interfaces/user.interface';
import { ResponseI } from '../../../interfaces/response.interface';
import { catchError, of } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { AlertService } from '../../../services/alert.service';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [ReactiveFormsModule, RouterModule],
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {

	authService = inject(AuthService);
	alert = inject(AlertService);
	router = inject(Router);

	userData = new FormGroup({
		username: new FormControl(''),
		password: new FormControl('')
	});

	login() {
		const loginData: UserI = this.userData.value!;
		this.authService.login(loginData).subscribe((res: ResponseI) => {
			if (res.success) {
				localStorage.setItem('token', res.data);
				this.alert.success('Login correcto', 'Bienvenido a la aplicacion');
				this.router.navigate(['/bookings']);
			} else {
				this.alert.error('Error', res.msg);
			}
		});
	}
}

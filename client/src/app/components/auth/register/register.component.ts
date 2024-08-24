import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserI } from '../../../interfaces/user.interface';
import { ResponseI } from '../../../interfaces/response.interface';
import { Router, RouterModule } from '@angular/router';
import { AlertService } from '../../../services/alert.service';

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [ReactiveFormsModule, RouterModule],
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent {
	authService = inject(AuthService);
	router = inject(Router);
	alert = inject(AlertService);

	userData = new FormGroup({
		username: new FormControl(''),
		password: new FormControl('')
	});

	register() {
		const registerData: UserI = this.userData.value!;
		this.authService.register(registerData).subscribe((data: ResponseI) => {
			if (data.success) {
				this.alert.success('Usuario creado', 'Usuario creado correctamente, por favor inicie sesion');
				this.router.navigate(['/login']);
			}else {
				this.alert.error('Error', data.msg);
			}
		});
	}
}

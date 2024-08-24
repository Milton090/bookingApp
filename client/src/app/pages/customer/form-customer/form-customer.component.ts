import { Component, inject, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../../../services/customer.service';
import { CustomerI } from '../../../interfaces/customer.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AlertService } from '../../../services/alert.service';


@Component({
  selector: 'app-form-customer',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './form-customer.component.html',
  styleUrl: './form-customer.component.css'
})

export class FormCustomerComponent {
  customerService = inject(CustomerService);
  alert = inject(AlertService);

  constructor(
    public dialogRef: MatDialogRef<FormCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CustomerI
  ) { }

  newForm = new FormGroup({
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  });

  method: string = this.data ? 'Editar' : 'Crear';

  ngOnInit(): void {
    if (this.data) {
      this.newForm.patchValue({
        name: this.data.name,
        lastName: this.data.lastName,
        email: this.data.email,
        phone: this.data.phone,
      });

    }
  }

  saveCustomer(): void {
    const formValue = this.newForm.value;

    const data: CustomerI = {
      id: this.data?.id,
      name: formValue.name as string,
      lastName: formValue.lastName as string,
      email: formValue.email as string,
      phone: formValue.phone as string
    };

    if (this.data?.id) {
      this.customerService.update(data).subscribe((res) => {
        if (res.success) {
          this.alert.success('Cliente actualizado', res.msg);
          this.dialogRef.close(true);
        }
      });
    } else {
      this.customerService.create(data).subscribe((res) => {
        if (res.success) {
          this.alert.success('Cliente creado', res.msg);
          this.dialogRef.close(true);
        }
      });
    }
  }
}

import { Component, inject, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AlertService } from '../../../services/alert.service';
import { ServiceI } from '../../../interfaces/service.interface';
import { ServiceService } from '../../../services/service.service';


@Component({
  selector: 'app-form-service',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './form-service.component.html',
  styleUrl: './form-service.component.css'
})

export class FormServiceComponent {
  serviceService = inject(ServiceService);
  alert = inject(AlertService);

  constructor(
    public dialogRef: MatDialogRef<FormServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ServiceI
  ) { }

  newForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  method: string = this.data ? 'Editar' : 'Crear';

  ngOnInit(): void {
    if (this.data) {
      this.newForm.patchValue({
        name: this.data.name,
        description: this.data.description,
      });
    }
  }

  saveService(): void {
    const formValue = this.newForm.value;

    const data: ServiceI = {
      id: this.data?.id,
      name: formValue.name as string,
      description: formValue.description as string,
    };

    if (this.data?.id) {
      this.serviceService.update(data).subscribe((res) => {
        if (res.success) {
          this.alert.success('Servicio actualizado', res.msg);
          this.dialogRef.close(true);
        }
      });
    } else {
      this.serviceService.create(data).subscribe((res) => {
        if (res.success) {
          this.alert.success('Servicio creado', res.msg);
          this.dialogRef.close(true);
        }
      });
    }
  }
}

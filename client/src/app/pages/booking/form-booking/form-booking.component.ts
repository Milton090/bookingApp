import { Component, inject, OnInit, Inject } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, MatNativeDateModule, MatOptionModule, NativeDateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ServiceI } from '../../../interfaces/service.interface';
import { ServiceService } from '../../../services/service.service';
import { CustomerService } from '../../../services/customer.service';
import { CustomerI } from '../../../interfaces/customer.interface';
import { BookingService } from '../../../services/booking.service';
import { BookingI } from '../../../interfaces/booking.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ResponseI } from '../../../interfaces/response.interface';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-form-booking',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './form-booking.component.html',
  styleUrl: './form-booking.component.css',
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },
  ],
})

export class FormBookingComponent implements OnInit {
  serviceService = inject(ServiceService);
  customerService = inject(CustomerService);
  bookingService = inject(BookingService);
  alert = inject(AlertService);

  constructor(
    public dialogRef: MatDialogRef<FormBookingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BookingI
  ) {  }


  newForm = new FormGroup({
    customerId: new FormControl('', Validators.required),
    serviceId: new FormControl('', Validators.required),
    dateBooking: new FormControl(new Date(), Validators.required),
  });

  method: string = this.data ? 'Editar' : 'Crear';

  services!: ServiceI[];
  customers!: CustomerI[];

  ngOnInit(): void {
    this.serviceService.getAll().subscribe((res: ResponseI) => {
      this.services = res.data;
    });
    this.customerService.getAll().subscribe((res: ResponseI) => {
      this.customers = res.data;
    });

    if (this.data) {
      this.newForm.patchValue({
        customerId: this.data.customerId,
        serviceId: this.data.serviceId,
        dateBooking: new Date(this.data.dateBooking),
      });

    }
  }

  saveBooking(): void {
    const formValue = this.newForm.value;

    const data: BookingI = {
      id: this.data?.id,
      customerId: formValue.customerId!,
      serviceId: formValue.serviceId!,
      dateBooking: formValue.dateBooking as Date
    };
    console.log("recibo",this.data);
    console.log("pa mandar",data);
    if (this.data) {
      this.bookingService.update(data).subscribe((res) => {
        if (res.success) {
          this.alert.success('Reservación actualizada', res.msg);
          this.dialogRef.close(true);
        }
      });
    } else {
      this.bookingService.create(data).subscribe((res) => {
        if (res.success) {
          this.alert.success('Reservación creada', res.msg);
          this.dialogRef.close(true);
        }
      });
    }
  }
}

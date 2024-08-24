import { Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BookingService } from '../../../services/booking.service';
import { BookingI } from '../../../interfaces/booking.interface';
import { DatePipe, NgStyle } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MenuComponent } from '../../../components/menu/menu.component';
import { MatButtonModule } from '@angular/material/button';
import { FormBookingComponent } from '../form-booking/form-booking.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from '../../../services/alert.service';
import { ResponseI } from '../../../interfaces/response.interface';
import { SweetAlertResult } from 'sweetalert2';


@Component({
  selector: 'app-list-bookings',
  standalone: true,
  imports: [
    MenuComponent,
    MatPaginatorModule,
    NgStyle,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatLabel,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    DatePipe
  ],
  templateUrl: './list-bookings.component.html',
  styleUrl: './list-bookings.component.css'
})

export class ListBookingsComponent {

  alert = inject(AlertService);

  constructor(
    private api: BookingService,
    private dialog: MatDialog
  ) { }

  bookings: BookingI[] = [];
  dataSource = new MatTableDataSource(this.bookings);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.api.getAll().subscribe((res: ResponseI) => {
      this.bookings = res.data;
      this.dataSource.data = this.bookings;
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  openDialog(booking?: BookingI) {
    this.dialog.open(FormBookingComponent, {
      width: '500px',
      data: booking ? booking : null
    }).afterClosed().subscribe((data) => {
      if (data) {
        this.api.getAll().subscribe((res: ResponseI) => {
          this.bookings = res.data;
          this.dataSource.data = this.bookings;
        });
      }
    });
  }


  deleteBooking(id: any): void {
    this.alert.question('Confirmacion', '¿Estás seguro que quieres eliminar esta reserva?')
      .then((result: SweetAlertResult) => {
        if (result.isConfirmed) {
          this.api.delete(id).subscribe(
            (res) => {
              if (res.msg) {
                this.bookings = this.bookings.filter(b => b.id !== id);
                this.dataSource.data = this.bookings;
                this.alert.success('Reserva eliminada', res.msg);
              } else {
                this.alert.error('Error al eliminar', 'Ha ocurrido un error al eliminar la reserva. Por favor, inténtalo nuevamente.');
              }
            },
            (error: any) => {
              this.alert.error('Error al eliminar', 'Ha ocurrido un error al eliminar la reserva. Por favor, inténtalo nuevamente.');
            });
        }
      });
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

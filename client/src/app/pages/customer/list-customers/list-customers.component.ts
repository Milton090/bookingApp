import { Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CustomerService } from '../../../services/customer.service';
import { CustomerI } from '../../../interfaces/customer.interface';
import { NgStyle } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MenuComponent } from '../../../components/menu/menu.component';
import { MatButtonModule } from '@angular/material/button';
import { FormCustomerComponent } from '../form-customer/form-customer.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from '../../../services/alert.service';
import { ResponseI } from '../../../interfaces/response.interface';
import { SweetAlertResult } from 'sweetalert2';


@Component({
  selector: 'app-list-customers',
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
    MatButtonModule
  ],
  templateUrl: './list-customers.component.html',
  styleUrl: './list-customers.component.css'
})

export class ListCustomersComponent {
  alert = inject(AlertService);

  constructor(
    private api: CustomerService,
    private dialog: MatDialog
  ) { }

  customers: CustomerI[] = [];
  dataSource = new MatTableDataSource(this.customers);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.api.getAll().subscribe((res: ResponseI) => {
      this.customers = res.data;
      this.dataSource.data = this.customers;
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  openDialog(customer?: CustomerI) {
    this.dialog.open(FormCustomerComponent, {
      width: '500px',
      data: customer ? customer : null
    }).afterClosed().subscribe((data) => {
      if (data) {
        this.api.getAll().subscribe((res: ResponseI) => {
          this.customers = res.data;
          this.dataSource.data = this.customers;
        });
      }
    });
  }


  deleteCustomer(id: any): void {
    this.alert.question('Confirmacion', '¿Estás seguro que quieres eliminar este cliente?')
      .then((result: SweetAlertResult) => {
        if (result.isConfirmed) {
          this.api.delete(id).subscribe(
            (res) => {
              if (res.msg) {
                this.customers = this.customers.filter(b => b.id !== id);
                this.dataSource.data = this.customers;
                this.alert.success('Cliente eliminade', res.msg);
              } else {
                this.alert.error('Error al eliminar', 'Ha ocurrido un error al eliminar el cliente. Por favor, inténtalo nuevamente.');
              }
            },
            (error: any) => {
              this.alert.error('Error al eliminar', 'Ha ocurrido un error al eliminar el cliente. Por favor, inténtalo nuevamente.');
            });
        }
      });
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

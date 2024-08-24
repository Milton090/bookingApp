import { Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgStyle } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MenuComponent } from '../../../components/menu/menu.component';
import { MatButtonModule } from '@angular/material/button';
import { FormServiceComponent } from '../form-service/form-service.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from '../../../services/alert.service';
import { ResponseI } from '../../../interfaces/response.interface';
import { ServiceI } from '../../../interfaces/service.interface';
import { ServiceService } from '../../../services/service.service';


@Component({
  selector: 'app-list-services',
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
  templateUrl: './list-services.component.html',
  styleUrl: './list-services.component.css'
})

export class ListServicesComponent {
  alert = inject(AlertService);

  constructor(
    private api: ServiceService,
    private dialog: MatDialog
  ) { }

  services: ServiceI[] = [];
  dataSource = new MatTableDataSource(this.services);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.api.getAll().subscribe((res: ResponseI) => {
      this.services = res.data;
      this.dataSource.data = this.services;
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  openDialog(service?: ServiceI) {
    this.dialog.open(FormServiceComponent, {
      width: '500px',
      data: service ? service : null
    }).afterClosed().subscribe((data) => {
      if (data) {
        this.api.getAll().subscribe((res: ResponseI) => {
          this.services = res.data;
          this.dataSource.data = this.services;
        });
      }
    });
  }

  deleteService(id: any): void {
    this.alert.question('Confirmacion', '¿Estás seguro que quieres eliminar este servicio?')
      .then((result) => {
        if (result.isConfirmed) {
          this.api.delete(id).subscribe(
            (res) => {
              if (res.msg) {
                this.services = this.services.filter(b => b.id !== id);
                this.dataSource.data = this.services;
                this.alert.success('Servicio eliminado', res.msg);
              } else {
                this.alert.error('Error al eliminar', 'Ha ocurrido un error al eliminar el servicio. Por favor, inténtalo nuevamente.');
              }
            },
            (error: any) => {
              this.alert.error('Error al eliminar', 'Ha ocurrido un error al eliminar el servicio. Por favor, inténtalo nuevamente.');
            });
        }
      });
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

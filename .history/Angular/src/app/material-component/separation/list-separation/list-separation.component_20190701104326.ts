import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SeparationFilter } from 'src/app/models/separation-filter';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Separation } from 'src/app/models/separation';
import { ActivatedRoute, Router } from '@angular/router';
import { SeparationService } from 'src/app/_services/separation.service';
import { ModalService } from 'src/app/_services/modal.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-list-separation',
  templateUrl: './list-separation.component.html',
  styleUrls: ['./list-separation.component.css']
})
export class ListSeparationComponent implements OnInit, AfterViewInit {

  filters = new SeparationFilter();
  displayedColumns: string[] = [ 'description', 'measuresUnit', 'quantity' , 'productName', 'plantName' , 'actions'];
  public dataSource = new MatTableDataSource<Separation>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private route: ActivatedRoute, private router: Router,  private alertify: AlertifyService,
              private separationService: SeparationService,  public dialogService: ModalService) { }


  ngOnInit() {
    this.route.data.subscribe(data => {
      this.dataSource.data =  data.separations.entity as Separation[];
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  pageChanged(event: any): void {
    this.filters.pageNumber = event.page;
    this.getAll();
  }

  getAll()  {
    this.separationService.getAll(this.filters).subscribe((res) => {
       this.dataSource.data = res.entity as Separation[];
      // this.filters = res.product.filters;
    }, error => {
      this.alertify.error(error);
    });
  }


  createSeparation() {
    this.router.navigate(['separation/create']);
  }

  clearFilters(){

  }

  goToEdit(separationSelected: Separation) {
    this.router.navigate(['/separation/edit', separationSelected.separationId]);
   }

   delete(separationSelected): void {
    this.dialogService.openConfirmDialog('Está seguro que desea eliminar esta separación ?')
    .afterClosed().subscribe(res => {
      if (res) {
        this.separationService.delete(separationSelected.separationId).subscribe(() => {
          this.getAll();
          this.alertify.success('Eliminado exitosamente !');
        }, error => {
          this.alertify.error(error);
        });
      }
    });
  }
}

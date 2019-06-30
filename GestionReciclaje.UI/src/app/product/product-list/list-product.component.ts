import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, PageEvent } from '@angular/material';
import { Product } from 'src/app/models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';
import { ModalService } from 'src/app/_services/modal.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ProductFilter } from 'src/app/models/product-filter';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit, AfterViewInit {
  
  filters = new ProductFilter();
  
  displayedColumns: string[] = [ 'name', 'categoryName', 'description' , 'actions'];

  public dataSource = new MatTableDataSource<Product>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private route: ActivatedRoute, private router: Router,  private alertify: AlertifyService,
              private productService: ProductService,  public dialogService: ModalService) {
              }


  ngOnInit() {
    this.route.data.subscribe(data => {
      this.dataSource.data =  data.products.entity as Product[];
      this.filters.totalRecords = data.products.filters.totalRecords;
    });
  }

  ngAfterViewInit(): void {
     this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
  }

 pageChanged(event: any): void {
    this.filters.pageNumber = event.pageIndex + 1;
    this.filters.pageSize = event.pageSize;
    this.getAll();
  }


  getAll()  {
    this.productService.getAll(this.filters).subscribe((res) => {
      this.dataSource.data = res.entity as Product[];
    }, error => {
      this.alertify.error(error);
    });
  }

  createProduct() {
    this.router.navigate(['product/create']);
  }

  clearFilters(){

  }

  goToEdit(productSelected: Product) {
    this.router.navigate(['/product/edit', productSelected.productId]);
   }

   delete(productSelected): void {
    this.dialogService.openConfirmDialog('Está seguro que desea eliminar este producto ?')
    .afterClosed().subscribe(res => {
      if (res) {
        this.productService.delete(productSelected.productId).subscribe(() => {
          this.getAll();
          this.alertify.success('Eliminado exitosamente !');
        }, error => {
          this.alertify.error(error);
        });
      }
    });
  }
}

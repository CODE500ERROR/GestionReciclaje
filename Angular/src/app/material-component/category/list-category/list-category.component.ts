import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryFilter } from '../../../models/categoryFilter';
import { Category } from '../../../models/category';
import { AlertifyService } from '../../../shared/services/alertify.service';
import { CategoryService } from '../../../shared/services/category.service';
import { ModalService } from '../../../shared/services/modal.service';


@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit, AfterViewInit {
  
  filters = new CategoryFilter();
  displayedColumns: string[] = [ 'name', 'parentName', 'actions'];
  public dataSource = new MatTableDataSource<Category>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private route: ActivatedRoute, private router: Router,  private alertify: AlertifyService,
              private categoryService: CategoryService,  public dialogService: ModalService) { }


  ngOnInit() {
    this.route.data.subscribe(data => {
      this.dataSource.data =  data.categories.entity as Category[];
      this.filters.totalRecords = data.categories.filters.totalRecords;

    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

 pageChanged(event: any): void {
  this.filters.pageNumber = event.pageIndex + 1;
  this.filters.pageSize = event.pageSize;
  this.getAll();
  }


  getAll()  {
    this.categoryService.getAll(this.filters).subscribe((res) => {
      this.dataSource.data = res.entity as Category[];  
    }, error => {
      this.alertify.error(error);
    });
  }

  createcategory() {
    this.router.navigate(['category/create']);
  }

  clearFilters(){
    this.filters.name = '';
    this.getAll();
  }

  goToEdit(categorySelected: Category) {
    this.router.navigate(['/category/edit', categorySelected.categoryId]);
   }

   delete(categorySelected): void {
    this.dialogService.openConfirmDialog('Está seguro que desea eliminar esta categoría ?')
    .afterClosed().subscribe(res => {
      if (res) {
        this.categoryService.delete(categorySelected.categoryId).subscribe(() => {
          this.getAll();
          this.alertify.success('Eliminado exitosamente !');
        }, error => {
          this.alertify.error(error);
        });
      }
    });
  }
}

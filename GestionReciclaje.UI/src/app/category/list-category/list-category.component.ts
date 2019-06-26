import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Category } from 'src/app/models/category';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/_services/category.service';
import { ModalService } from 'src/app/_services/modal.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { CategoryFilter } from 'src/app/models/categoryFilter';

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
      // this.filters = data.category.filters;
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
    this.categoryService.getAll(this.filters).subscribe((res) => {
      // this.dataSource.data = res.category.entity as category[];
      // this.filters = res.category.filters;
      console.log(res);
    }, error => {
      this.alertify.error(error);
    });
  }

  createcategory() {
    this.router.navigate(['category/create']);
  }

  clearFilters(){

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

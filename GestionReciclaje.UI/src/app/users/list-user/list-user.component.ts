
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ModalService } from 'src/app/_services/modal.service';
import { UserFilter } from 'src/app/models/UserFilters';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit, AfterViewInit  {
  users: any [];
  isLoading = false;

  displayedColumns: string[] = [ 'firstName', 'lastName' , 'email', 'plantName','actions'];
  filters = new UserFilter();

  public dataSource = new MatTableDataSource<User>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private alertify: AlertifyService,
              public dialogService: ModalService) { }


  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;    
  }
  
  ngOnInit() {
    this.route.data.subscribe(data => {
      console.log(data);
      this.dataSource.data =  data.users.entity as User[];
      this.filters.totalRecords = data.users.filters.totalRecords;
    });
  }


  createUser() {
    this.router.navigate(['/user/create']);
  }

  getAll() {
    this.userService.getUsers(this.filters).subscribe((res) => {
      this.dataSource.data = res.entity as User[];
    }, error => {
      this.isLoading = false;
      this.alertify.error(error);
    });
  }

  pageChanged(event: any): void {
    this.filters.pageNumber = event.pageIndex + 1;
    this.filters.pageSize = event.pageSize;
    this.getAll();
  }

  goToEdit(userSelected) {
   this.router.navigate(['/user/edit', userSelected.id]);
  }

  delete(userSelected): void {
    this.dialogService.openConfirmDialog('Are you sure to delete this user ?')
    .afterClosed().subscribe(res => {
      if (res) {
        this.userService.deleteUser(userSelected.id).subscribe(() => {
          this.getAll();
          this.alertify.success('User deleted successfully');
        }, error => {
          this.alertify.error(error);
        });
      }
    });
  }

  clearFilters(){
    this.filters.email = '';
  }
}

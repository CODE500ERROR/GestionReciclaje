import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { ErrorInterceptorProvider } from './_helpers/error.interceptor';
import { AlertifyService } from './_services/alertify.service';
import { ListUserComponent } from './users/list-user/list-user.component';
import { LoginComponent } from './auth/login/login.component';

import { UserService } from './_services/user.service';

// ngx bootstrap
import {
  BsDropdownModule,
  TabsModule,
  BsDatepickerModule,
  PaginationComponent,
  PaginationModule,
  ButtonsModule
} from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';

// jwt
import { JwtModule } from '@auth0/angular-jwt';

import { NgxGalleryModule } from 'ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';
import { TimeAgoPipe } from 'time-ago-pipe';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

// guards
import { AuthGuard } from './_guards/auth.guard';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { DetailUserResolver } from './_resolvers/detail-user-resolvers';
import { ListUserResolver } from './_resolvers/list-user-resolvers';
import { LoaderService } from './_services/loader.service';
import { LoaderComponent } from './loader/loader.component';
import { LoaderInterceptor } from './_helpers/loader.interceptor';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { RolesService } from './_services/roles.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatToolbarModule,
  MatExpansionModule,
  MatIconModule,
  MatButtonModule,
  MatMenuModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatCheckboxModule,
  MatDialogModule,
  MatGridListModule,
  MatSidenavModule,
  MatListModule,
  MatSelectModule
} from '@angular/material';

import { ModalConfirmComponent } from './_helpers/modal-confirm/modal-confirm.component';
import { LayoutModule } from '@angular/cdk/layout';
import { NavbarComponent } from './navbar/navbar.component';
import { ListPlantComponent } from './plant/list-plant/list-plant.component';
import { CreatePlantComponent } from './plant/create-plant/create-plant.component';
import { EditPlantComponent } from './plant/edit-plant/edit-plant.component';
import { ListPlantResolver } from './_resolvers/list-plant-resolvers';
import { DetailPlantResolver } from './_resolvers/detail-plant-resolvers';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { CreateCategoryComponent } from './category/create-category/create-category.component';
import { ListCategoryComponent } from './category/list-category/list-category.component';

import { ListProductResolver } from './_resolvers/list-product-resolvers';
import { ListCategoryResolver } from './_resolvers/list-category-resolvers';
import { DetailProductResolver } from './_resolvers/detail-product-resolvers';
import { DetailCategoryResolver } from './_resolvers/detail-category-resolvers';
import { EditProductComponent } from './product/product-edit/edit-product.component';
import { CreateProductComponent } from './product/product-create/create-product.component';
import { ListProductComponent } from './product/product-list/list-product.component';
import { HasRoleDirective } from './_directives/hasRole.directive';
import { CreateSeparationComponent } from './separation/create-separation/create-separation.component';
import { EditSeparationComponent } from './separation/edit-separation/edit-separation.component';
import { ListSeparationComponent } from './separation/list-separation/list-separation.component';
import { ListSeparationResolver } from './_resolvers/list-separation-resolvers';
import { DetailSeparationResolver } from './_resolvers/detail-separation-resolvers';
import { SeparationService } from './_services/separation.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartBartComponent } from './chart-bart/chart-bart.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    LoginComponent,
    CreateUserComponent,
    LoaderComponent,
    ListUserComponent,
    EditUserComponent,
    TimeAgoPipe,
    ModalConfirmComponent,
    NavbarComponent,
    ListPlantComponent,
    CreatePlantComponent,
    EditPlantComponent,
    ListCategoryComponent,
    CreateCategoryComponent,
    EditCategoryComponent,
    ListProductComponent,
    CreateProductComponent,
    EditProductComponent,
    CreateSeparationComponent,
    EditSeparationComponent,
    ListSeparationComponent,
    HasRoleDirective,
    ChartBartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MatSelectModule,
    MatSortModule,
    MatGridListModule,
    MatRadioModule,
    MatDialogModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatTableModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    RouterModule.forRoot(appRoutes),
    NgxGalleryModule,
    FileUploadModule,
    PaginationModule.forRoot(),
    ReactiveFormsModule,
    ButtonsModule.forRoot(),
    PerfectScrollbarModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['http://c6303115.ngrok.io/'],
        blacklistedRoutes: ['http://c6303115.ngrok.io/api/auth']
      }
    }),
    BrowserAnimationsModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,    
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    LoaderService,
    RolesService,
    AuthGuard,
    ErrorInterceptorProvider,
    LoaderInterceptor,
    AlertifyService,
    DetailUserResolver,
    ListUserResolver,

    SeparationService,
    ListSeparationResolver,
    DetailSeparationResolver,

    ListPlantResolver,
    DetailPlantResolver,

    ListCategoryResolver,
    DetailCategoryResolver,

    ListProductResolver,
    DetailProductResolver,

    PreventUnsavedChanges,
    UserService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  entryComponents: [ListUserComponent, ModalConfirmComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}

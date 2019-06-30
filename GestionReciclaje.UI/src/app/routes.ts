import {Routes} from '@angular/router';
import { ListUserComponent } from './users/list-user/list-user.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { DetailUserResolver } from './_resolvers/detail-user-resolvers';
import { ListUserResolver } from './_resolvers/list-user-resolvers';
import { HomeComponent } from './home/home.component';
import { ListPlantResolver } from './_resolvers/list-plant-resolvers';
import { CreatePlantComponent } from './plant/create-plant/create-plant.component';
import { EditPlantComponent } from './plant/edit-plant/edit-plant.component';
import { ListPlantComponent } from './plant/list-plant/list-plant.component';
import { DetailPlantResolver } from './_resolvers/detail-plant-resolvers';
import { DetailCategoryResolver } from './_resolvers/detail-category-resolvers';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { CreateCategoryComponent } from './category/create-category/create-category.component';
import { ListCategoryComponent } from './category/list-category/list-category.component';
import { ListCategoryResolver } from './_resolvers/list-category-resolvers';
import { ListProductComponent } from './product/product-list/list-product.component';
import { CreateProductComponent } from './product/product-create/create-product.component';
import { EditProductComponent } from './product/product-edit/edit-product.component';
import { DetailProductResolver } from './_resolvers/detail-product-resolvers';
import { ListProductResolver } from './_resolvers/list-product-resolvers';



export const appRoutes: Routes = [

    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent},
    {
      path: '',
        runGuardsAndResolvers: 'pathParamsChange',
       // runGuardsAndResolvers: () => false,
       canActivate: [AuthGuard],
        children: [

            // ******************** USERS *******************
            {path: 'users', component: ListUserComponent, resolve: {users: ListUserResolver} , data: {roles: ['Admin', 'Super Admin']} },
            {path: 'user/edit/:id', component: EditUserComponent, resolve: {user: DetailUserResolver},
                                                                  data: {roles: ['Admin', 'Super Admin']}   },
            {path: 'user/create', component: CreateUserComponent, data: {roles: ['Admin', 'Super Admin']}},

            // ******************** PLANT *******************
            {path: 'Plant', component: ListPlantComponent , resolve: {plants: ListPlantResolver} ,data: {roles: ['Admin', 'Super Admin']} },
            {path: 'Plant/create', component: CreatePlantComponent , data: {roles: ['Admin', 'Super Admin']} },
            {path: 'Plant/edit/:id', component: EditPlantComponent , resolve: {plant: DetailPlantResolver} 
                                                                   , data: {roles: ['Admin', 'Super Admin']} },

            // ******************** CATEGORY *******************
            {path: 'category', component: ListCategoryComponent , resolve: {categories: ListCategoryResolver} 
                                                                , data: {roles: ['Admin', 'Super Admin']} },
            {path: 'category/create', component: CreateCategoryComponent , data: {roles: ['Admin', 'Super Admin']} },
            {path: 'category/edit/:id', component: EditCategoryComponent , resolve: {category: DetailCategoryResolver}
                                                                         , data: {roles: ['Admin', 'Super Admin']} },

            // ******************** PRODUCT *******************
            {path: 'product', component: ListProductComponent , resolve: {products: ListProductResolver}
                                                              , data: {roles: ['Admin', 'Super Admin','Operator']} },
            {path: 'product/create', component: CreateProductComponent , data: {roles: ['Admin', 'Super Admin','Operator']} },
            {path: 'product/edit/:id', component: EditProductComponent , resolve: {product: DetailProductResolver}
                                                                        , data: {roles: ['Admin', 'Super Admin','Operator']} },
        ]
     },
    {path: '**', redirectTo: 'login', pathMatch: 'full'},
];

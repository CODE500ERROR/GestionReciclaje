import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { DemoMaterialModule } from '../demo-material-module';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './material.routing';
import { ButtonsComponent } from './buttons/buttons.component';

import { GridComponent } from './grid/grid.component';
import { ListsComponent } from './lists/lists.component';
import { MenuComponent } from './menu/menu.component';
import { TabsComponent } from './tabs/tabs.component';
import { StepperComponent } from './stepper/stepper.component';
import { ExpansionComponent } from './expansion/expansion.component';
import { ChipsComponent } from './chips/chips.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProgressSnipperComponent } from './progress-snipper/progress-snipper.component';
import { ProgressComponent } from './progress/progress.component';
import {
  DialogComponent,
  DialogOverviewExampleDialogComponent
} from './dialog/dialog.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SliderComponent } from './slider/slider.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { ListPlantComponent } from './plant/list-plant/list-plant.component';
import { CreatePlantComponent } from './plant/create-plant/create-plant.component';
import { ListProductComponent } from './product/product-list/list-product.component';
import { CreateProductComponent } from './product/product-create/create-product.component';
import { EditProductComponent } from './product/product-edit/edit-product.component';
import { ListCategoryComponent } from './category/list-category/list-category.component';
import { CreateCategoryComponent } from './category/create-category/create-category.component';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { EditPlantComponent } from './plant/edit-plant/edit-plant.component';
import { CreateSeparationComponent } from './separation/create-separation/create-separation.component';
import { EditSeparationComponent } from './separation/edit-separation/edit-separation.component';
import { ListSeparationComponent } from './separation/list-separation/list-separation.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { ListUserComponent } from './users/list-user/list-user.component';
import { MatInputModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    MatInputModule,
  ],
  providers: [],
  entryComponents: [DialogOverviewExampleDialogComponent],
  declarations: [
    ButtonsComponent,
    GridComponent,
    ListsComponent,
    MenuComponent,
    TabsComponent,
    StepperComponent,
    ExpansionComponent,
    ChipsComponent,
    ToolbarComponent,
    ProgressSnipperComponent,
    ProgressComponent,
    DialogComponent,
    DialogOverviewExampleDialogComponent,
    TooltipComponent,
    SnackbarComponent,
    SliderComponent,
    SlideToggleComponent,
    
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

    CreateUserComponent,
    EditUserComponent,
    ListUserComponent,

  ]
})
export class MaterialComponentsModule {}

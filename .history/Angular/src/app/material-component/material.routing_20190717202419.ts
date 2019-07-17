import { Routes } from '@angular/router';

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
import { DialogComponent } from './dialog/dialog.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SliderComponent } from './slider/slider.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { ListPlantComponent } from './plant/list-plant/list-plant.component';
import { ListPlantResolver } from '../shared/resolvers/list-plant.resolvers';
import { CreatePlantComponent } from './plant/create-plant/create-plant.component';
import { ListProductComponent } from './product/product-list/list-product.component';
import { CreateProductComponent } from './product/product-create/create-product.component';
import { EditProductComponent } from './product/product-edit/edit-product.component';
import { ListProductResolver } from '../shared/resolvers/list-product-resolvers';
import { DetailProductResolver } from '../shared/resolvers/detail-product-resolvers';


export const MaterialRoutes: Routes = [
  {
    path: 'button',
    component: ButtonsComponent
  },
  {
    path: 'grid',
    component: GridComponent
  },
  {
    path: 'lists',
    component: ListsComponent
  },
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path: 'tabs',
    component: TabsComponent
  },
  {
    path: 'stepper',
    component: StepperComponent
  },
  {
    path: 'expansion',
    component: ExpansionComponent
  },
  {
    path: 'chips',
    component: ChipsComponent
  },
  {
    path: 'toolbar',
    component: ToolbarComponent
  },
  {
    path: 'progress-snipper',
    component: ProgressSnipperComponent
  },
  {
    path: 'progress',
    component: ProgressComponent
  },
  {
    path: 'dialog',
    component: DialogComponent
  },
  {
    path: 'tooltip',
    component: TooltipComponent
  },
  {
    path: 'snackbar',
    component: SnackbarComponent
  },
  {
    path: 'slider',
    component: SliderComponent
  },
  {
    path: 'slide-toggle',
    component: SlideToggleComponent
  },
  

  // ******************** PLANT *******************
  {
    path: 'plant',
    component: ListPlantComponent,
    resolve: { plants: ListPlantResolver },
    data: { roles: ['Admin', 'Super Admin'] }
  },
  {
    path: 'plant/create',
    component: CreatePlantComponent,
    data: { roles: ['Admin', 'Super Admin'] }
  },
  {
    path: 'plant/edit/:id',
    component: EditPlantComponent,
    resolve: { plant: DetailPlantResolver },
    //data: { roles: ['Admin', 'Super Admin'] }
  },


  // ******************** PRODUCT *******************
  {
    path: 'product',
    component: ListProductComponent,
    resolve: { products: ListProductResolver },
    // data: { roles: ['Admin', 'Super Admin', 'Operator'] }
  },
  {
    path: 'product/create',
    component: CreateProductComponent,
    // data: { roles: ['Admin', 'Super Admin', 'Operator'] }
  },
  {
    path: 'product/edit/:id',
    component: EditProductComponent,
    resolve: { product: DetailProductResolver },
    // data: { roles: ['Admin', 'Super Admin', 'Operator'] }
  },

];

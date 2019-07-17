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
import { EditPlantComponent } from './plant/edit-plant/edit-plant.component';
import { DetailPlantResolver } from '../shared/resolvers/detail-plant-resolvers';
import { ListCategoryComponent } from './category/list-category/list-category.component';
import { ListCategoryResolver } from '../shared/resolvers/list-category-resolvers';
import { CreateCategoryComponent } from './category/create-category/create-category.component';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { DetailCategoryResolver } from '../shared/resolvers/detail-category-resolvers';
import { ListSeparationComponent } from './separation/list-separation/list-separation.component';
import { ListSeparationResolver } from '../shared/resolvers/list-separation-resolvers';
import { CreateSeparationComponent } from './separation/create-separation/create-separation.component';
import { EditSeparationComponent } from './separation/edit-separation/edit-separation.component';
import { DetailSeparationResolver } from '../shared/resolvers/detail-separation-resolvers';


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
    // data: { roles: ['Admin', 'Super Admin'] }
  },

// ******************** CATEGORY *******************
{
  path: 'category',
  component: ListCategoryComponent,
  resolve: { categories: ListCategoryResolver },
  // data: { roles: ['Admin', 'Super Admin'] }
},
{
  path: 'category/create',
  component: CreateCategoryComponent,
  // data: { roles: ['Admin', 'Super Admin'] }
},
{
  path: 'category/edit/:id',
  component: EditCategoryComponent,
  resolve: { category: DetailCategoryResolver },
  // data: { roles: ['Admin', 'Super Admin'] }
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

  // *********************SEPARATION ***************************** */
  {
    path: 'separation',
    component: ListSeparationComponent,
    resolve: { separations: ListSeparationResolver },
    // data: { roles: ['Admin', 'Super Admin', 'Operator'] }
  },
  {
    path: 'separation/create',
    component: CreateSeparationComponent,
    // data: { roles: ['Admin', 'Super Admin', 'Operator'] }
  },
  {
    path: 'separation/edit/:id',
    component: EditSeparationComponent,
    resolve: { separation: DetailSeparationResolver },
    // data: { roles: ['Admin', 'Super Admin', 'Operator'] }
  },


];

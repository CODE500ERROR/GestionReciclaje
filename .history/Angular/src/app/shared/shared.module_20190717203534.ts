import { NgModule } from '@angular/core';
import { MenuItems } from './menu-items/menu-items';
import { ListPlantResolver } from './resolvers/list-plant.resolvers';
import { ModalConfirmComponent } from './helpers/modal-confirm/modal-confirm.component';
import { ListProductResolver } from './resolvers/list-product-resolvers';
import { DetailProductResolver } from './resolvers/detail-product-resolvers';
import { ListCategoryResolver } from './resolvers/list-category-resolvers';
import { DetailCategoryResolver } from './resolvers/detail-category-resolvers';


@NgModule({
  declarations: [
    ModalConfirmComponent
  ],
  exports: [],
  providers: [ MenuItems , 
    
    ListPlantResolver,

    ListProductResolver,
    DetailProductResolver,
    
    ListCategoryResolver,
    DetailCategoryResolver,
    SeparationService,
    ListSeparationResolver,
    DetailSeparationResolver,
  ]
})
export class SharedModule { }

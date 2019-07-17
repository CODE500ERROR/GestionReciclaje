import { NgModule } from '@angular/core';
import { MenuItems } from './menu-items/menu-items';
import { ListPlantResolver } from './resolvers/list-plant.resolvers';
import { ModalConfirmComponent } from './helpers/modal-confirm/modal-confirm.component';


@NgModule({
  declarations: [
    ModalConfirmComponent
  ],
  exports: [
   ],
  providers: [ MenuItems , ListPlantResolver ]
})
export class SharedModule { }

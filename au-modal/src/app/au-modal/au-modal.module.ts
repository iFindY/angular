import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuModalComponent } from './au-modal.component';
import { AuModalOpenOnClickDirective } from './au-modal-open-on-click.directive';
import { AuModalService } from './au-modal.service';

@NgModule({
  declarations: [AuModalComponent, AuModalOpenOnClickDirective],
  imports: [
    CommonModule
  ],
  exports: [AuModalComponent, AuModalOpenOnClickDirective]
})
export class AuModalModule {

  // static initialise for this module used in app.module
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuModalModule,
      providers: [AuModalService] //  only one instance of this service is created
    }
  }
}




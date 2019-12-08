import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AuMaskModule} from "./au-mask/au-mask.module";
import {HttpClientModule} from "@angular/common/http";
import { MaskDirective } from './au-mask/mask.directive';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AuMaskModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}

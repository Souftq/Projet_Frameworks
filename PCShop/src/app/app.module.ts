import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './button/button.component';
import { ImageCliquableComponent } from './image-cliquable/image-cliquable.component';
import { DropDownComponent } from './drop-down/drop-down.component';
import { IndicateursPrixComponent } from './indicateurs-prix/indicateurs-prix.component';
import { TitresComponent } from './titres/titres.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    ImageCliquableComponent,
    DropDownComponent,
    IndicateursPrixComponent,
    TitresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

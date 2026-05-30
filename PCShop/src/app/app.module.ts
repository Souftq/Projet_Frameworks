import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './button/button.component';
import { ImageCliquableComponent } from './image-cliquable/image-cliquable.component';
import { DropDownComponent } from './drop-down/drop-down.component';
import { IndicateursPrixComponent } from './indicateurs-prix/indicateurs-prix.component';
import { TitresComponent } from './titres/titres.component';
import { AccueilComponent } from './accueil/accueil.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ChoicesAssistedComponent } from './choices-assisted/choices-assisted.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { MenuComponent } from './menu/menu.component';
import { ChoicesManualComponent } from './choices-manual/choices-manual.component';
import { CartComponent } from './cart/cart.component';
import { CartTotalComponent } from './cart-total/cart-total.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PaiementComponent } from './paiement/paiement.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    ImageCliquableComponent,
    DropDownComponent,
    IndicateursPrixComponent,
    TitresComponent,
    AccueilComponent,
    HeaderComponent,
    ChoicesAssistedComponent,
    ProductInfoComponent,
    MenuComponent,
    FooterComponent,
    ChoicesManualComponent,
    CartComponent,
    CartTotalComponent,
    LoginComponent,
    RegisterComponent,
    PaiementComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,

  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

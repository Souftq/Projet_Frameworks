import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccueilComponent } from './accueil/accueil.component';
import { ChoicesAssistedComponent } from './choices-assisted/choices-assisted.component';
import { ChoicesManualComponent } from './choices-manual/choices-manual.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { PaiementComponent } from './paiement/paiement.component';

const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'assist', component: ChoicesAssistedComponent },
  { path: 'manual', component: ChoicesManualComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'produit/:id', component: ProductInfoComponent },
  { path: 'paiement', component: PaiementComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

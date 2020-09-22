import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './layout/components/home/home.component';
import { ProductsComponent } from './layout/components/products/products.component';


const routes: Routes = [
  {path: 'Inicio', component: HomeComponent},
  {path: 'Productos', component: ProductsComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'Inicio'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

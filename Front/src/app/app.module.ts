import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/components/header/header.component';
import { ProductsComponent } from './layout/components/products/products.component';
import { HomeComponent } from './layout/components/home/home.component';
import { ProductsService } from './shared/services/products.service';
import { FormProductsComponent } from './layout/components/form-products/form-products.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from './shared/modal/modal.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    HomeComponent,
    FormProductsComponent,

  ],
  
  imports: [
    BrowserAnimationsModule,NgxSpinnerModule,
    ToastrModule.forRoot({
      newestOnTop: false,
      preventDuplicates: true
    }),
    BrowserModule, ModalModule,
    AppRoutingModule,
    HttpClientModule,FormsModule,ReactiveFormsModule,
    NgbModule
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSidenavModule,
  MatToolbarModule,
  MatMenuModule,
  MatSelectModule,
  MatCheckboxModule,
  MatDialogModule,
  MatIconModule
} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app.routing';
import { ProductComponent } from './dashboard/product/product.component';
import { StoreComponent } from './dashboard/store/store.component';
import { StoreownerComponent } from './dashboard/storeowner/storeowner.component';
import { StoredetailsComponent } from './dashboard/store/storedetails/storedetails.component';
import { ProductdetailsComponent } from './dashboard/product/productdetails/productdetails.component';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import { EthcontractService } from './shared/ethContract.service';
import { StoreownerdetailsComponent } from './dashboard/storeowner/storeownerdetails/storeownerdetails.component';
import { AdminComponent } from './dashboard/admin/admin.component';
import { AddproductComponent } from './dashboard/product/addproduct/addproduct.component';
import { AddstoreComponent } from './dashboard/store/addstore/addstore.component';
import { AddstoreownerComponent } from './dashboard/storeowner/addstoreowner/addstoreowner.component';
import { AddadminComponent } from './dashboard/admin/addadmin/addadmin.component';
import { AllstoresComponent } from './dashboard/allstores/allstores.component';
import { BuyproductComponent } from './dashboard/product/buyproduct/buyproduct.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ProductComponent,
    StoreComponent,
    StoreownerComponent,
    StoredetailsComponent,
    ProductdetailsComponent,
    StoreownerdetailsComponent,
    AdminComponent,
    AddproductComponent,
    AddstoreComponent,
    AddstoreownerComponent,
    AddadminComponent,
    AllstoresComponent,
    BuyproductComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatSidenavModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MatCheckboxModule,
    AppRoutingModule,
    MatMenuModule,
    FlexLayoutModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule//, MatDialogRef, MAT_DIALOG_DATA
  ],
   entryComponents: [AddadminComponent, AdminComponent, BuyproductComponent],
  providers: [ EthcontractService],
  bootstrap: [AppComponent]
})
export class AppModule { }

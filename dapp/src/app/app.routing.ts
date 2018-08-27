import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './dashboard/product/product.component';
import { StoreComponent } from './dashboard/store/store.component';
import { ProductdetailsComponent } from './dashboard/product/productdetails/productdetails.component';
import { StoreownerComponent } from './dashboard/storeowner/storeowner.component';
import { StoredetailsComponent } from './dashboard/store/storedetails/storedetails.component';

import{DashboardComponent} from './dashboard/dashboard.component';
import { AppRoutes } from './app-routes.enum';
import { StoreownerdetailsComponent } from './dashboard/storeowner/storeownerdetails/storeownerdetails.component';
import { AdminComponent } from './dashboard/admin/admin.component';
import { AddproductComponent } from './dashboard/product/addproduct/addproduct.component';
import { AddstoreComponent } from './dashboard/store/addstore/addstore.component';
import { AddstoreownerComponent } from './dashboard/storeowner/addstoreowner/addstoreowner.component';
import { AllstoresComponent } from './dashboard/allstores/allstores.component';

const routes: Routes = [
  {
    path: AppRoutes.Base,
    pathMatch: 'full',
    redirectTo: AppRoutes.Login//AppRoutes.Dashboard
    // canActivate: [LoggedInGuard]
  },
    {
    path: AppRoutes.Dashboard,
    component: DashboardComponent,
    children: [
      {
        path: AppRoutes.Base,
        pathMatch: 'full',
        redirectTo: AppRoutes.AllStores
      },
      {
      path: AppRoutes.Products,
      component: ProductComponent
    },
    {
    path: AppRoutes.StoreOwner,
    component: StoreownerComponent
  },
 {
      path: AppRoutes.Stores,
      component: StoreComponent
    },
    {
         path: AppRoutes.AllStores,
         component: AllstoresComponent
       }, {
      path: AppRoutes.StoreDetails,
      component: StoredetailsComponent
    }, {
      path: AppRoutes.ProductDetails,
      component: ProductdetailsComponent
    }, {
      path: AppRoutes.StoreOwnerDetails,
      component: StoreownerdetailsComponent
    },
    {
     path: AppRoutes.AddStoreOwner ,
     component: AddstoreownerComponent
   },
   {
    path: AppRoutes.AddStore,
    component: AddstoreComponent
  },
  {
   path: AppRoutes.AddProduct,
   component: AddproductComponent
 },
    {
      path: AppRoutes.Admin,
      component: AdminComponent
    }
  ]
  },
  {
    path: AppRoutes.Login,
    component: LoginComponent
    // canActivate: [LoggedInGuard]
  }
];




@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { };
// export const routingComponents = [LoginComponent, SignupComponent,DashboardComponent];

import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {EthcontractService} from './../../shared/ethContract.service';
import {MatDialog} from '@angular/material';
import {BuyproductComponent} from './buyproduct/buyproduct.component';
import {ProductdetailsComponent} from './productdetails/productdetails.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
products: any[];
accessType : any;
selectedProductId : any;
selectedProduct : any;
quantity: any;
activeAccount : any;
@Input() store : any;
@Input() parent : number;
  constructor(private route: ActivatedRoute, private router: Router, private ethcontractService: EthcontractService, public dialog: MatDialog){}

  ngOnInit() {
    this.activeAccount= this.ethcontractService.getValidAccount();
    if(this.activeAccount ===undefined){
       this.router.navigate(['/login']);
    }
    console.log('parent',this.parent);
    this.ethcontractService.checkAccess().then(accessType=>{
      this.accessType= accessType[2];
      console.log(this.accessType);
      });


    this.ethcontractService.getProductsInStore(this.store).then((products)=>{
   this.products = products;
   console.log(products);
   // that.balance = acctInfo.balance;
 }).catch((error)=>{
   console.log(error);
 });



  }

  addProduct(){
     this.router.navigate(['/dashboard/products/addproduct',{store:this.store}]);
  }
 // show(rindex){
 //   if(this.accessType){
 //   this.router.navigate(['/dashboard/products/productdetails',{id:rindex}]);
 // }
 // }


  openDialog(idx): void {
      this.selectedProductId=this.products[idx].productId.toNumber();
      console.log(this.selectedProductId);
      const dialogRef = this.dialog.open(BuyproductComponent, {
        width: '450px',
        data: { selectedProduct : this.products[idx] }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(idx);
        if(result!= undefined){
        this.quantity = result;
        this.products[idx].productdetail[3]= this.products[idx].productdetail[3]-this.quantity;
        this.ethcontractService.buyProduct(this.store,this.selectedProductId, this.quantity ).then((products)=>{
       // this.products = products;
       console.log(products);
       // that.balance = acctInfo.balance;
      }).catch((error)=>{
       console.log(error);
      });
      }

      });
    }

    editProduct(idx): void {
        this.selectedProduct=this.products[idx];
        console.log(this.selectedProduct);
        const dialogRef = this.dialog.open(ProductdetailsComponent, {
          width: '450px',
          data: { selectedProduct: this.selectedProduct, store  :this.store}
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        if(result!= undefined){
          this.selectedProduct = result;
          console.log(this.selectedProduct);
          this.ethcontractService.updateProduct(this.store,this.selectedProduct.productId.toNumber(),this.selectedProduct.productdetail[0],this.selectedProduct.productdetail[1], this.selectedProduct.productdetail[2], this.selectedProduct.productdetail[3]).then((products)=>{
         // this.products = products;
         this.products[idx]=  this.selectedProduct ;
         console.log(products);
         // that.balance = acctInfo.balance;
        }).catch((error)=>{
         console.log(error);
        });
        }

        });
      }
}

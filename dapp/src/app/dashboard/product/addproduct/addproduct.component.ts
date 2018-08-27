import { Component, OnInit, Input } from '@angular/core';
import {EthcontractService} from './../../../shared/ethContract.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  store : any;
product : any;
   constructor(private route: ActivatedRoute, private router: Router, private ethcontractService: EthcontractService){
   this.product={name:'', description:'', price:0, quantity :0};
   }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      console.log(params);
    this.store = params['store'];
    // this.store = this.ethcontractService.getStoreDetailId(rindex);
    console.log(this.store);
    });
  }

  addProductToTheStore(){
    this.ethcontractService. addProductToTheStore(this.store, this.product.name,this.product.description,this.product.price, this.product.quantity).then(function(status){
     console.log(status);
   // that.balance = acctInfo.balance;
  }).catch(function(error){
   console.log(error);
  });
  this.router.navigate(['/dashboard/stores']);
  }
  reset(){
     this.product={name:'', description:'', price:0, quantity :0};
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {EthcontractService} from './../../shared/ethContract.service'

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
 @Input() storeOwner : any;
 @Input() isOwner : boolean;
activeAccount: any;
  stores: any[]=[];
    constructor(private route: ActivatedRoute, private router: Router, private ethcontractService: EthcontractService){
      this.isOwner =false;
    }

    ngOnInit() {
      this.activeAccount= this.ethcontractService.getValidAccount();
      if(this.activeAccount ===undefined){
         this.router.navigate(['/login']);
      }
      else{
        this.ethcontractService.getStores(this.storeOwner).then((stores)=>{
           this.stores = stores;
           console.log(stores);
           // that.balance = acctInfo.balance;
         }).catch((error)=>{
           console.log(error);
         });
       }
    }
    addStore(){
       this.router.navigate(['/dashboard/stores/addstore']);
    }
   show(rindex){
     this.router.navigate(['/dashboard/stores/storedetails',{id:rindex, p:0}]);
   }
}

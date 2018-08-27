import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {EthcontractService} from './../../shared/ethContract.service'

@Component({
  selector: 'app-allstores',
  templateUrl: './allstores.component.html',
  styleUrls: ['./allstores.component.css']
})
export class AllstoresComponent implements OnInit {
    activeAccount : any;
    stores: any[];
      constructor(private route: ActivatedRoute, private router: Router, private ethcontractService: EthcontractService){
            }

      ngOnInit() {
        this.activeAccount = this.ethcontractService.getValidAccount();
        if(this.activeAccount ===undefined){
           this.router.navigate(['/login']);
        }
        this.ethcontractService.getStores('*').then((stores)=>{
       this.stores = stores;
       console.log(stores);
       // that.balance = acctInfo.balance;
     }).catch((error)=>{
       console.log(error);
     });
      }
      // addStore(){
      //    this.router.navigate(['/dashboard/stores/addstore']);
      // }
     show(rindex){
       this.router.navigate(['/dashboard/stores/storedetails',{id:rindex, p:1}]);
     }
  }

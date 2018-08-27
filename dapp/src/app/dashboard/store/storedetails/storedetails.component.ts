import { Component, OnInit } from '@angular/core';
import {EthcontractService} from './../../../shared/ethContract.service'
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-storedetails',
  templateUrl: './storedetails.component.html',
  styleUrls: ['./storedetails.component.css']
})
export class StoredetailsComponent implements OnInit {
  store: any;
  staddress='';
  parent: number;
   constructor(private route: ActivatedRoute, private router: Router, private ethcontractService: EthcontractService) {
   // this.store={name:'', description:''};
  }

   ngOnInit() {
     this.route.params.subscribe((params: Params) => {
       console.log(params);
     const rindex= params['id'];
     this.parent = params['p'];
     this.store = this.ethcontractService.getStoreDetailId(rindex);
     console.log(this.store);
     });

   }
  onSave(){
    this.ethcontractService.createStoreFront(this.store.name, this.store.description).then(function(status){
     console.log(status);
   // that.balance = acctInfo.balance;
 }).catch(function(error){
   console.log(error);
 });
 this.router.navigate(['/dashboard/store']);
  }
Reset(){
  this.store={name:'', description:''};
}
}

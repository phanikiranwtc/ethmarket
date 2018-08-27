import { Component, OnInit } from '@angular/core';
// import {Web3Service} from './../../util/web3.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {EthcontractService} from './../../../shared/ethContract.service'

@Component({
  selector: 'app-storeownerdetails',
  templateUrl: './storeownerdetails.component.html',
  styleUrls: ['./storeownerdetails.component.css']
})
export class StoreownerdetailsComponent implements OnInit {

  stOwner: any;
   constructor(private route: ActivatedRoute, private router: Router, private ethcontractService: EthcontractService) {
   this.stOwner='';
  }

   ngOnInit() {
     this.route.params.subscribe((params: Params) => {
       console.log(params);
     this.stOwner= params['id'];
     console.log(this.stOwner);
     });
   }
    addStoreOwnerDetails() {
         console.log('Adding new storeowner');
         this.ethcontractService.addStoreOwnerDetails(this.stOwner).then(function(status){
         //'674967e937e03ae769aeb84d0eb46c892345d045', { from :  '4b630b804e900939d09b674eb189be3946f10a15'}).then(function(status){
        // that.storeOwner = stowner;
        console.log(status);
        // that.balance = acctInfo.balance;
      }).catch(function(error){
        console.log(error);
      });
      this.router.navigate(['/dashboard/storeowner']);

       }
 reset(){
   this.stOwner='';
 }
}

import { Component, OnInit } from '@angular/core';
// import { StoreOwner } from '../../shared/storeowner.interface';
// import { CommonService } from '../../shared/common.service';
// import {Web3Service} from '../../util/web3.service';
import {EthcontractService} from './../../shared/ethContract.service'
import { Router, ActivatedRoute, Params } from '@angular/router';
// declare let require: any;
// const marketplace_artifacts = require('../../../../build/contracts/MarketPlace.json');
import {AddstoreownerComponent} from './addstoreowner/addstoreowner.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-storeowner',
  templateUrl: './storeowner.component.html',
  styleUrls: ['./storeowner.component.css']
})
export class StoreownerComponent implements OnInit {
  storeOwners: any[]=[];
  MarketPlace : any;
  stOwner :any;
  activeAccount: any;
    constructor(private route: ActivatedRoute, private router: Router, private ethcontractService: EthcontractService, public dialog: MatDialog){
        // console.log('Constructor: ' + ethcontractService);
    }

    ngOnInit() {
      this.activeAccount= this.ethcontractService.getValidAccount();
      if(this.activeAccount ===undefined){
         this.router.navigate(['/login']);
      }else{
      this.ethcontractService.getStoreOwners().then(stOwner=>{
        console.log(stOwner);
        this.storeOwners = stOwner;
      });
      }
    }


    addStoreOwner(){
      // this.addStoreOwnerDetails('0x674967e937e03AE769Aeb84D0Eb46c892345d045');
       // this.router.navigate(['/dashboard/storeowner/addstoreowner']);
       const dialogRef = this.dialog.open(AddstoreownerComponent, {
         width: '450px',
         data: { account: this.stOwner}
       });

       dialogRef.afterClosed().subscribe(result => {
         console.log('The dialog was closed');
         if(result!= undefined){
         this.stOwner = result;
         this.storeOwners.push(this.stOwner);
         console.log('Adding new storeowner');
         this.ethcontractService.addStoreOwnerDetails(this.stOwner).then(function(status){
          console.log(status);
      }).catch(function(error){
        console.log(error);
      });
       }
       });
    }
   show(rindex){
     this.router.navigate(['/dashboard/storeowner/storeownerdetails',{id:rindex}]);
   }

}

import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
// import {EthcontractService} from './../../../shared/ethContract.service';
@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
  stOwner: any;
  productid : number;
   constructor(  public dialogRef: MatDialogRef<ProductdetailsComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any){
     }

   ngOnInit() {
     console.log(this.data);
     // this.route.params.subscribe((params: Params) => {
     // let id = parseInt(params['id']);
     // this.productid = id;
     // console.log(id);
     // });
   }
   onNoClick(): void {
     this.dialogRef.close();
   }

  }

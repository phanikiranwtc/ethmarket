import { Component, OnInit } from '@angular/core';
import {EthcontractService} from './../../../shared/ethContract.service'
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-addstore',
  templateUrl: './addstore.component.html',
  styleUrls: ['./addstore.component.css']
})
export class AddstoreComponent implements OnInit {
  store: any;
   constructor(private route: ActivatedRoute, private router: Router, private ethcontractService: EthcontractService) {
   this.store={name:'', description:''};
  }

   ngOnInit() {
   }
  onSave(){
    console.log('in save');
    console.log(this.store.name);
    console.log(this.store.description);
    this.ethcontractService.createStoreFront(this.store.name, this.store.description).then(function(status){
     console.log(status);
   // that.balance = acctInfo.balance;
  }).catch(function(error){
   console.log(error);
  });
  this.router.navigate(['/dashboard/stores']);
  }
  Reset(){
  this.store={name:'', description:''};
  }
  }

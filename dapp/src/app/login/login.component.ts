import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {EthcontractService} from './../shared/ethContract.service'
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
adminFlag :boolean;
activeAccount : string;
accessType : string;

  constructor(private route: ActivatedRoute, private router: Router, private ethcontractService: EthcontractService) { }

  ngOnInit() {
    this.adminFlag=false;
    }

 signin(){
    console.log(this.activeAccount);
    var status = this.ethcontractService.setValidAccount(this.activeAccount);
    this.router.navigate(['/dashboard']);
}
}

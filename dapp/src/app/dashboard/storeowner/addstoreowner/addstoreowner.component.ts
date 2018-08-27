import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-addstoreowner',
  templateUrl: './addstoreowner.component.html',
  styleUrls: ['./addstoreowner.component.css']
})
export class AddstoreownerComponent implements OnInit {
  stOwner: any;
  constructor(
      public dialogRef: MatDialogRef<AddstoreownerComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

    ngOnInit() {}
  }

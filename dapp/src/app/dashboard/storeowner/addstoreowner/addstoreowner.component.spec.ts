import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddstoreownerComponent } from './addstoreowner.component';

describe('AddstoreownerComponent', () => {
  let component: AddstoreownerComponent;
  let fixture: ComponentFixture<AddstoreownerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddstoreownerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddstoreownerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

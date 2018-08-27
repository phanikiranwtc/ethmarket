import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreownerdetailsComponent } from './storeownerdetails.component';

describe('StoreownerdetailsComponent', () => {
  let component: StoreownerdetailsComponent;
  let fixture: ComponentFixture<StoreownerdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreownerdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreownerdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

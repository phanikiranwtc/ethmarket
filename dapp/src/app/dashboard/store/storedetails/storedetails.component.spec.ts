import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoredetailsComponent } from './storedetails.component';

describe('StoredetailsComponent', () => {
  let component: StoredetailsComponent;
  let fixture: ComponentFixture<StoredetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoredetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoredetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

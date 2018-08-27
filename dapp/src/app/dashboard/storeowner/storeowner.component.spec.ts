import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreownerComponent } from './storeowner.component';

describe('StoreownerComponent', () => {
  let component: StoreownerComponent;
  let fixture: ComponentFixture<StoreownerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreownerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreownerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

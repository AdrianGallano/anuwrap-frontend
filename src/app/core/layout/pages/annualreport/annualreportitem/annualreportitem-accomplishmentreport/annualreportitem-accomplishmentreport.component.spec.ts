import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualreportitemAccomplishmentreportComponent } from './annualreportitem-accomplishmentreport.component';

describe('AnnualreportitemAccomplishmentreportComponent', () => {
  let component: AnnualreportitemAccomplishmentreportComponent;
  let fixture: ComponentFixture<AnnualreportitemAccomplishmentreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnualreportitemAccomplishmentreportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnnualreportitemAccomplishmentreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

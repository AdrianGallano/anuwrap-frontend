import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualreportitemComponent } from './annualreportitem.component';

describe('AnnualreportitemComponent', () => {
  let component: AnnualreportitemComponent;
  let fixture: ComponentFixture<AnnualreportitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnualreportitemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnnualreportitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

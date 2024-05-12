import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewannualreportAccomplishmentreportComponent } from './viewannualreport-accomplishmentreport.component';

describe('ViewannualreportAccomplishmentreportComponent', () => {
  let component: ViewannualreportAccomplishmentreportComponent;
  let fixture: ComponentFixture<ViewannualreportAccomplishmentreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewannualreportAccomplishmentreportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewannualreportAccomplishmentreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

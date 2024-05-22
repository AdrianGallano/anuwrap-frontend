import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualreportlistComponent } from './annualreportlist.component';

describe('AnnualreportlistComponent', () => {
  let component: AnnualreportlistComponent;
  let fixture: ComponentFixture<AnnualreportlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnualreportlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnnualreportlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

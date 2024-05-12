import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomplishmentreportitemComponent } from './accomplishmentreportitem.component';

describe('AccomplishmentreportitemComponent', () => {
  let component: AccomplishmentreportitemComponent;
  let fixture: ComponentFixture<AccomplishmentreportitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccomplishmentreportitemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccomplishmentreportitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

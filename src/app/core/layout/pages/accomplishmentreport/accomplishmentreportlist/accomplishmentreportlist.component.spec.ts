import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomplishmentreportlistComponent } from './accomplishmentreportlist.component';

describe('AccomplishmentreportlistComponent', () => {
  let component: AccomplishmentreportlistComponent;
  let fixture: ComponentFixture<AccomplishmentreportlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccomplishmentreportlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccomplishmentreportlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

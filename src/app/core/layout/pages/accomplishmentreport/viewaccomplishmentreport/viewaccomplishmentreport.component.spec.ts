import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewaccomplishmentreportComponent } from './viewaccomplishmentreport.component';

describe('ViewaccomplishmentreportComponent', () => {
  let component: ViewaccomplishmentreportComponent;
  let fixture: ComponentFixture<ViewaccomplishmentreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewaccomplishmentreportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewaccomplishmentreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

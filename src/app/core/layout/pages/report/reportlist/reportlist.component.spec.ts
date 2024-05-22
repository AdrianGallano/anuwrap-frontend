import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportlistComponent } from './reportlist.component';

describe('ReportlistComponent', () => {
  let component: ReportlistComponent;
  let fixture: ComponentFixture<ReportlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

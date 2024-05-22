import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualreportitemFacultyMatrixComponent } from './annualreportitem-facultymatrix.component';

describe('AnnualreportitemFacultymatrixComponent', () => {
  let component: AnnualreportitemFacultyMatrixComponent;
  let fixture: ComponentFixture<AnnualreportitemFacultyMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnualreportitemFacultyMatrixComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnnualreportitemFacultyMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

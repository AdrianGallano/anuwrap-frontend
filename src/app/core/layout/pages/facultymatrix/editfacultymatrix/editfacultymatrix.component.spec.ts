import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditfacultymatrixComponent } from './editfacultymatrix.component';

describe('EditfacultymatrixComponent', () => {
  let component: EditfacultymatrixComponent;
  let fixture: ComponentFixture<EditfacultymatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditfacultymatrixComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditfacultymatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatefacultymatrixComponent } from './createfacultymatrix.component';

describe('CreatefacultymatrixComponent', () => {
  let component: CreatefacultymatrixComponent;
  let fixture: ComponentFixture<CreatefacultymatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatefacultymatrixComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatefacultymatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

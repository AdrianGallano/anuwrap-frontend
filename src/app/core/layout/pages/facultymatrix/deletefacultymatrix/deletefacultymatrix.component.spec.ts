import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletefacultymatrixComponent } from './deletefacultymatrix.component';

describe('DeletefacultymatrixComponent', () => {
  let component: DeletefacultymatrixComponent;
  let fixture: ComponentFixture<DeletefacultymatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletefacultymatrixComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeletefacultymatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

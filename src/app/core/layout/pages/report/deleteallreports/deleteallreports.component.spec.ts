import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteallreportsComponent } from './deleteallreports.component';

describe('DeleteallreportsComponent', () => {
  let component: DeleteallreportsComponent;
  let fixture: ComponentFixture<DeleteallreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteallreportsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteallreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

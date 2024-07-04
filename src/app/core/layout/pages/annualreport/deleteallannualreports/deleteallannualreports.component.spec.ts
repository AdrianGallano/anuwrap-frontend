import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteallannualreportsComponent } from './deleteallannualreports.component';

describe('DeleteallannualreportsComponent', () => {
  let component: DeleteallannualreportsComponent;
  let fixture: ComponentFixture<DeleteallannualreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteallannualreportsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteallannualreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

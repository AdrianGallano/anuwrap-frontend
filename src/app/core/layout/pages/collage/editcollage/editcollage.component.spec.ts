import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcollageComponent } from './editcollage.component';

describe('EditcollageComponent', () => {
  let component: EditcollageComponent;
  let fixture: ComponentFixture<EditcollageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditcollageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditcollageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

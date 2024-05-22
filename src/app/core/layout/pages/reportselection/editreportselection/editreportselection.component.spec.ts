import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditreportselectionComponent } from './editreportselection.component';

describe('EditreportselectionComponent', () => {
  let component: EditreportselectionComponent;
  let fixture: ComponentFixture<EditreportselectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditreportselectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditreportselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaccomplishmentreportComponent } from './editaccomplishmentreport.component';

describe('EditaccomplishmentreportComponent', () => {
  let component: EditaccomplishmentreportComponent;
  let fixture: ComponentFixture<EditaccomplishmentreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditaccomplishmentreportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditaccomplishmentreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

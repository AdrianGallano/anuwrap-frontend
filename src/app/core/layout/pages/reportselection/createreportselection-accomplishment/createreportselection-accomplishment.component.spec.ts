import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatereportselectionAccomplishmentComponent } from './createreportselection-accomplishment.component';

describe('CreatereportselectionAccomplishmentComponent', () => {
  let component: CreatereportselectionAccomplishmentComponent;
  let fixture: ComponentFixture<CreatereportselectionAccomplishmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatereportselectionAccomplishmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatereportselectionAccomplishmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

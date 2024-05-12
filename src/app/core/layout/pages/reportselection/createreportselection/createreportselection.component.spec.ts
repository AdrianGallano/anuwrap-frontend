import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatereportselectionComponent } from './createreportselection.component';

describe('CreatereportselectionComponent', () => {
  let component: CreatereportselectionComponent;
  let fixture: ComponentFixture<CreatereportselectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatereportselectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatereportselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

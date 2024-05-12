import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateaccomplishmentreportComponent } from './createaccomplishmentreport.component';

describe('CreateaccomplishmentreportComponent', () => {
  let component: CreateaccomplishmentreportComponent;
  let fixture: ComponentFixture<CreateaccomplishmentreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateaccomplishmentreportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateaccomplishmentreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

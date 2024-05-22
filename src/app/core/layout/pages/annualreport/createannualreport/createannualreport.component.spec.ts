import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateannualreportComponent } from './createannualreport.component';

describe('CreateannualreportComponent', () => {
  let component: CreateannualreportComponent;
  let fixture: ComponentFixture<CreateannualreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateannualreportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateannualreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

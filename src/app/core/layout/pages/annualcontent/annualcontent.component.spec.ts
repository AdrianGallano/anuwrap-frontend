import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualcontentComponent } from './annualcontent.component';

describe('AnnualcontentComponent', () => {
  let component: AnnualcontentComponent;
  let fixture: ComponentFixture<AnnualcontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnualcontentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnnualcontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

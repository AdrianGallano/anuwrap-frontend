import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteannualreportComponent } from './deleteannualreport.component';

describe('DeleteannualreportComponent', () => {
  let component: DeleteannualreportComponent;
  let fixture: ComponentFixture<DeleteannualreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteannualreportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteannualreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

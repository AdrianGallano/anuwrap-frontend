import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletereportselectionComponent } from './deletereportselection.component';

describe('DeletereportselectionComponent', () => {
  let component: DeletereportselectionComponent;
  let fixture: ComponentFixture<DeletereportselectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletereportselectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeletereportselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

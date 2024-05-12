import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteaccomplishmentreportComponent } from './deleteaccomplishmentreport.component';

describe('DeleteaccomplishmentreportComponent', () => {
  let component: DeleteaccomplishmentreportComponent;
  let fixture: ComponentFixture<DeleteaccomplishmentreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteaccomplishmentreportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteaccomplishmentreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

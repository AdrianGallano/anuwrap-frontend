import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageImageComponent } from './manage-image.component';

describe('ManageImageComponent', () => {
  let component: ManageImageComponent;
  let fixture: ComponentFixture<ManageImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

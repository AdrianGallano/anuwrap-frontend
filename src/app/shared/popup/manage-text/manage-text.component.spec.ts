import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTextComponent } from './manage-text.component';

describe('ManageTextComponent', () => {
  let component: ManageTextComponent;
  let fixture: ComponentFixture<ManageTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageTextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

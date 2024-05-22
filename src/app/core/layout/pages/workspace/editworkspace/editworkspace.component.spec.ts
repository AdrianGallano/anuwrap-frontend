import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditworkspaceComponent } from './editworkspace.component';

describe('EditworkspaceComponent', () => {
  let component: EditworkspaceComponent;
  let fixture: ComponentFixture<EditworkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditworkspaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditworkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

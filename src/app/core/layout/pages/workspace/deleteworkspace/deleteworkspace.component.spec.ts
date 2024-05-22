import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteworkspaceComponent } from './deleteworkspace.component';

describe('DeleteworkspaceComponent', () => {
  let component: DeleteworkspaceComponent;
  let fixture: ComponentFixture<DeleteworkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteworkspaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteworkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

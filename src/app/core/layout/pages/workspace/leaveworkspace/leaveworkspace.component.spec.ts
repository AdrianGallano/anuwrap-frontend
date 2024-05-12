import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveworkspaceComponent } from './leaveworkspace.component';

describe('LeaveworkspaceComponent', () => {
  let component: LeaveworkspaceComponent;
  let fixture: ComponentFixture<LeaveworkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveworkspaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeaveworkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

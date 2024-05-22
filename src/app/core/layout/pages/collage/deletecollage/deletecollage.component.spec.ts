import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletecollageComponent } from './deletecollage.component';

describe('DeletecollageComponent', () => {
  let component: DeletecollageComponent;
  let fixture: ComponentFixture<DeletecollageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletecollageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeletecollageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

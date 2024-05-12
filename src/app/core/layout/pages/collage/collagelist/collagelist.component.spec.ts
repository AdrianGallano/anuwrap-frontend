import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollagelistComponent } from './collagelist.component';

describe('CollagelistComponent', () => {
  let component: CollagelistComponent;
  let fixture: ComponentFixture<CollagelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollagelistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollagelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

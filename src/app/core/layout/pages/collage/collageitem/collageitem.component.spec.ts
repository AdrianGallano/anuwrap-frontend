import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollageitemComponent } from './collageitem.component';

describe('CollageitemComponent', () => {
  let component: CollageitemComponent;
  let fixture: ComponentFixture<CollageitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollageitemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollageitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

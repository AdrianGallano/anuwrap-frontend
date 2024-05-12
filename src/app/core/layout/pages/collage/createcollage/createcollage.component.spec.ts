import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecollageComponent } from './createcollage.component';

describe('CreatecollageComponent', () => {
  let component: CreatecollageComponent;
  let fixture: ComponentFixture<CreatecollageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatecollageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatecollageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

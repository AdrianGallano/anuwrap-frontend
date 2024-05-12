import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatwithaiComponent } from './chatwithai.component';

describe('ChatwithaiComponent', () => {
  let component: ChatwithaiComponent;
  let fixture: ComponentFixture<ChatwithaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatwithaiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatwithaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

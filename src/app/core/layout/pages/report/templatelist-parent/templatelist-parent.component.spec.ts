import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatelistParentComponent } from './templatelist-parent.component';

describe('TemplatelistParentComponent', () => {
  let component: TemplatelistParentComponent;
  let fixture: ComponentFixture<TemplatelistParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplatelistParentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemplatelistParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

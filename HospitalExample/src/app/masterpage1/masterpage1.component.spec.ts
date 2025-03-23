import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Masterpage1Component } from './masterpage1.component';

describe('Masterpage1Component', () => {
  let component: Masterpage1Component;
  let fixture: ComponentFixture<Masterpage1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Masterpage1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Masterpage1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Masterpage2Component } from './masterpage2.component';

describe('Masterpage2Component', () => {
  let component: Masterpage2Component;
  let fixture: ComponentFixture<Masterpage2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Masterpage2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Masterpage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

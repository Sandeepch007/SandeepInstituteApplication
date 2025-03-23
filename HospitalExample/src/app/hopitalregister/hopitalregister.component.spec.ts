import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HopitalregisterComponent } from './hopitalregister.component';

describe('HopitalregisterComponent', () => {
  let component: HopitalregisterComponent;
  let fixture: ComponentFixture<HopitalregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HopitalregisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HopitalregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

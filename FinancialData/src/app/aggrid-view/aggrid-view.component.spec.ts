import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggridViewComponent } from './aggrid-view.component';

describe('AggridViewComponent', () => {
  let component: AggridViewComponent;
  let fixture: ComponentFixture<AggridViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AggridViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AggridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

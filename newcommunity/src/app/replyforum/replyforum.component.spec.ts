import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyforumComponent } from './replyforum.component';

describe('ReplyforumComponent', () => {
  let component: ReplyforumComponent;
  let fixture: ComponentFixture<ReplyforumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReplyforumComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReplyforumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

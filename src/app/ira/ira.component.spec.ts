import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IraComponent } from './ira.component';

describe('IraComponent', () => {
  let component: IraComponent;
  let fixture: ComponentFixture<IraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

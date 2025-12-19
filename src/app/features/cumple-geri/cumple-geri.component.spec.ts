import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CumpleGeriComponent } from './cumple-geri.component';

describe('CumpleGeriComponent', () => {
  let component: CumpleGeriComponent;
  let fixture: ComponentFixture<CumpleGeriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CumpleGeriComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CumpleGeriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

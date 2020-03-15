import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { StatsModalComponent } from './stats-modal.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('StatsModalComponent', () => {
  let component: StatsModalComponent;
  let fixture: ComponentFixture<StatsModalComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsModalComponent ],
      providers: [
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsModalComponent);
    component = fixture.componentInstance;
    component.metrics = {
        numFocus: 0,
        numShortBreak: 0,
        numLongBreak: 0
    };
    fixture.detectChanges();
    de = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an H1 Title of `Focus Statistics`', () => {
    expect(de.query(By.css('h1')).nativeElement.innerText).toBe('Focus Statistics');
  });

});

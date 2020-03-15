import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SettingsModalComponent } from './settings-modal.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import 'hammerjs';

describe('SettingsModalComponent', () => {
  let component: SettingsModalComponent;
  let fixture: ComponentFixture<SettingsModalComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsModalComponent],
      imports: [
        MatSliderModule,
        MatSlideToggleModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsModalComponent);
    component = fixture.componentInstance;
    component.timerSettings = {
        focusLength: 25,
        shortBreakLength: 5,
        longBreakLength: 10,
        longBreakInterval: 4,
        autoStartTimer: false
    };
    fixture.detectChanges();
    de = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an H1 Title of `Timer Settings`', () => {
    expect(de.query(By.css('h1')).nativeElement.innerText).toBe('Timer Settings');
  });

});

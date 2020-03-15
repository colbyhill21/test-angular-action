import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss']
})

export class SettingsModalComponent implements OnInit {
  focusLength = 25;
  shortBreakLength = 5;
  longBreakLength = 20;
  longBreakInterval = 4;
  autoStartTimer = false;

  @Input() public timerSettings;
  @Output() settingsData = new EventEmitter<string>();

  constructor(public dialogRef: MatDialogRef<SettingsModalComponent>) { }

  sendMessage() {
    let message = this.focusLength.toString() + ', ' + this.shortBreakLength.toString() + ', ' + this.longBreakLength.toString() + ', ';
    message += this.longBreakInterval.toString() + ', ';
    if (this.autoStartTimer) {
      message += 'true';
    } else {
      message += 'false';
    }
    this.settingsData.emit(message);
  }

  autoStartToggleChanged(toggleStatus) {
    this.autoStartTimer = toggleStatus.checked;
  }
  changeFocusLengthSlider(slider) {
    this.focusLength = slider.value;
  }

  changeShortBreakLengthSlider(slider) {
    this.shortBreakLength = slider.value;
  }

  changeLongBreakLengthSlider(slider) {
    this.longBreakLength = slider.value;
  }
  changeLongBreakInterval(slider) {
    this.longBreakInterval = slider.value;
  }

  ngOnInit() {
    this.focusLength = this.timerSettings.focusLength;
    this.shortBreakLength = this.timerSettings.shortBreakLength;
    this.longBreakLength = this.timerSettings.longBreakLength;
    this.longBreakInterval = this.timerSettings.longBreakInterval;
    this.autoStartTimer = this.timerSettings.autoStartTimer;
  }
  // When the user clicks the action button a.k.a. the logout button in the\
  // modal, show an alert and followed by the closing of the modal
  actionFunction() {
    alert('You have logged out.');
    this.closeModal();
  }

  // If the user clicks the cancel button a.k.a. the go back button, then\
  // just close the modal
  closeModal() {
    this.dialogRef.close();
    this.sendMessage();
  }

}

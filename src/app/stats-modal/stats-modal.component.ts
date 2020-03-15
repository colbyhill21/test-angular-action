import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-stats-modal',
  templateUrl: './stats-modal.component.html',
  styleUrls: ['./stats-modal.component.scss']
})
export class StatsModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<StatsModalComponent>) { }

  @Input() public metrics;

  numFocus = 0;
  numShortBreak = 0;
  numLongBreak = 0;

  ngOnInit() {
    this.numFocus = this.metrics.numFocus;
    this.numShortBreak = this.metrics.numShortBreak;
    this.numLongBreak = this.metrics.numLongBreak;
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
  }
}

import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StatsModalComponent } from './stats-modal/stats-modal.component';
import { SettingsModalComponent } from './settings-modal/settings-modal.component';
import { Title } from '@angular/platform-browser';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'TaskFocus';
    focus = true;
    shortBreak = false;
    longBreak = false;
    startStopText = 'Start';
    numFocus = 0;
    numShortBreak = 0;
    numLongBreak = 0;

    focusLength = 25;
    shortBreakLength = 5;
    longBreakLength = 20;
    longBreakInterval = 4;
    autoStartTimer = false;

    currentLength = this.focusLength; // the selector based on the current segment (focus, sb, lb)
    seconds = 0;
    time = '' + this.currentLength + ':00';
    timeLeft: number = this.focusLength * 60;
    interval;

    public constructor(private titleService: Title, public matDialog: MatDialog) { }

    openStatisticsModal() {
        const dialogConfig = this.initDialogConfig(300, 400);
        const modalRef = this.matDialog.open(StatsModalComponent, dialogConfig);
        modalRef.componentInstance.metrics = {
            numFocus: this.numFocus,
            numShortBreak: this.numShortBreak,
            numLongBreak: this.numLongBreak
        };
    }
    openSettingsModal() {
        const dialogConfig = this.initDialogConfig(450, 500);
        const modalRef = this.matDialog.open(SettingsModalComponent, dialogConfig);
        modalRef.componentInstance.timerSettings = { // pass our current settings as input
            focusLength: this.focusLength,
            shortBreakLength: this.shortBreakLength,
            longBreakLength: this.longBreakLength,
            longBreakInterval: this.longBreakInterval,
            autoStartTimer: this.autoStartTimer
        };
        modalRef.componentInstance.settingsData.subscribe((receivedEntry) => {
            this.updateSettings(receivedEntry.toString()); // parse and update my values
        });
    }

    initDialogConfig(height: number, width: number): MatDialogConfig {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true; // The user can't close the dialog by clicking outside its body
        dialogConfig.id = 'modal-component';
        dialogConfig.height = height.toString() + 'px';
        dialogConfig.width = width.toString() + 'px';
        return dialogConfig;
    }

    public setTitle(newTitle: string) {
        this.titleService.setTitle( newTitle );
    }
    focusSelected() {
        this.focus = true;
        this.shortBreak = false;
        this.longBreak = false;
        this.currentLength = this.focusLength;
        this.resetPressed();
    }
    shortBreakSelected() {
        this.focus = false;
        this.shortBreak = true;
        this.longBreak = false;
        this.currentLength = this.shortBreakLength;
        this.time = '' + this.currentLength + ':00';
        this.resetPressed();
    }
    longBreakSelected() {
        this.focus = false;
        this.shortBreak = false;
        this.longBreak = true;
        this.currentLength = this.longBreakLength;
        this.time = '' + this.currentLength + ':00';
        this.resetPressed();
    }
    startStopPressed() {
        if (this.startStopText === 'Start') {
            this.startStopText = 'Stop';
            this.startTimer();
        } else {
            this.startStopText = 'Start';
            this.pauseTimer();
        }
    }
    resetPressed() {
        this.timeLeft = this.currentLength * 60;
        clearInterval(this.interval);
        this.startStopText = 'Start';
        this.time = '' + this.currentLength + ':00';
    }

    startTimer() {
        this.interval = setInterval(() => {
            if (this.timeLeft > 0) {
                this.timeLeft--;
                this.time = '' + (Math.trunc(this.timeLeft / 60)) + ':';
                const s =  Math.trunc(this.timeLeft % 60);
                if (s < 10) {
                    this.time += '0' + s;
                } else {
                    this.time += s;
                }
                this.setTitle('TaskFocus (' + this.time + ')'); // Update the Document Title in Browser
            } else {
                this.nextSession();
            }
        }, 1000);
    }

    nextSession() {
        if (this.focus) {
            this.startBreak();
            this.numFocus += 1;
        } else {
            this.focusSelected();
        }


        if (this.autoStartTimer) {
            this.startStopPressed();
        }
    }

    pauseTimer() {
        clearInterval(this.interval);
    }

    startBreak() {
        if ((this.numFocus % (this.longBreakInterval - 1)) === 0) {
            this.longBreakSelected();
            this.numLongBreak += 1;
        } else {
            this.shortBreakSelected();
            this.numShortBreak += 1;
        }
    }

    updateSettings(settingsString: string) {
        const splitted = settingsString.split(',');
        // for (let i = 0; i < splitted.length; i++) {
        //     console.log(splitted[i]);
        // }
        this.focusLength = Number(splitted[0].trim());
        this.shortBreakLength = Number(splitted[1].trim());
        this.longBreakLength = Number(splitted[2].trim());
        this.longBreakInterval = Number(splitted[3].trim());
        if (splitted[4].trim() === 'true') {
            this.autoStartTimer = true;
        } else {
            this.autoStartTimer = false;
        }

        // update timer
        if (this.focus) {
            this.focusSelected();
        } else if (this.shortBreak) {
            this.shortBreakSelected();
        } else {
            this.longBreakSelected();
        }
    }

}

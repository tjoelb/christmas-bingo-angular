import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

import { interval, Subscription } from 'rxjs';
import { TextToSpeechService } from './text-to-speech.service';

export interface bElement {b: number;}
export interface iElement {i: number;}
export interface nElement {n: number;}
export interface gElement {g: number;}
export interface oElement {o: number;}

const B_DATA: bElement[] = [ ...Array(15).keys() ].map(val => ({b: val+1}));
const I_DATA: iElement[] = [ ...Array(15).keys() ].map(val => ({i: val+16}));
const N_DATA: nElement[] = [ ...Array(15).keys() ].map(val => ({n: val+31}));
const G_DATA: gElement[] = [ ...Array(15).keys() ].map(val => ({g: val+46}));
const O_DATA: oElement[] = [ ...Array(15).keys() ].map(val => ({o: val+61}));

function shuffle(array: number[]) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array
}

@Component({
    selector: 'app-root',
    imports: [
        MatButtonModule, MatTooltipModule, MatTableModule,
        MatSidenavModule,  MatDividerModule, MatSliderModule,
        MatInputModule, MatFormFieldModule, FormsModule
    ],
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './app.component.scss'
})
export class AppComponent {
    private ttsService = inject(TextToSpeechService);

    title = 'christmas-bingo-angular';
    private intervalSubscription: Subscription | undefined;
    secondsInterval = 5;

    call = shuffle(Array.from({length: 75}, (_, i) => i + 1))
    called: number[] = []
    currentCall = ""
    previousCall = ""
    ballColor = "red"

    callIndex = -1

    constructor() {
        const calledSet = new Set(this.called);
        this.call = this.call.filter(item => !calledSet.has(item));

        console.log("Randomized Call Order: ", this.call)
    }

    iMarkCalled(): void {
        this.markCalled([16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]);
    }

    nMarkCalled(): void {
        this.markCalled([31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45]);
    }
    gMarkCalled(): void {
        this.markCalled([46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60]);
    }

    markCalled(list: number[]): void {
        this.called = this.called.concat(list);
        const calledSet = new Set(this.called);
        this.call = this.call.filter(item => !calledSet.has(item));

        console.log("NEW Randomized Call Order: ", this.call)
    }

    start(): void {
        if (typeof this.intervalSubscription === 'undefined') {
            console.log("setting sub")
            this.intervalSubscription = interval(this.secondsInterval * 1000).subscribe(() => {
                this.callNumber();
            });
        }
    }

    stop(): void {
        if (typeof this.intervalSubscription !== 'undefined') {
            this.intervalSubscription.unsubscribe();
            this.intervalSubscription = undefined
        }
    }

    callNumber(): void {
        this.callIndex += 1
        if (this.callIndex <= this.call.length) {
            this.previousCall = this.currentCall
            const numberToCall = this.call[this.callIndex]
            this.called.push(numberToCall)
            let say = ""
            if (numberToCall < 16) {
                say = "b " + numberToCall
            } else if (numberToCall < 31) {
                say = "i " + numberToCall
            } else if (numberToCall < 46) {
                say = "n " + numberToCall
            } else if (numberToCall < 61) {
                say = "g " + numberToCall
            } else {
                say = "o " + numberToCall
            }
            this.currentCall = say.toUpperCase()
            this.sayRow(say.replace("67", "6 7"))
            if (this.callIndex % 2 == 0) {
                this.ballColor = "red"
            } else {
                this.ballColor = "green"
            }
        }
    }

    sayRow(row:string): void {
        row = row.replace("67", "6 7")
        console.log(row)
        this.ttsService.speak(row);
    }


    bDisplayedColumns: string[] = ['b'];
    bDataSource = B_DATA;
    iDisplayedColumns: string[] = ['i'];
    iDataSource = I_DATA;
    nDisplayedColumns: string[] = ['n'];
    nDataSource = N_DATA;
    gDisplayedColumns: string[] = ['g'];
    gDataSource = G_DATA;
    oDisplayedColumns: string[] = ['o'];
    oDataSource = O_DATA;

}

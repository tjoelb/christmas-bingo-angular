import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

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
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array
}

@Component({
    selector: 'app-root',
    imports: [MatButtonModule, MatTableModule, MatSidenavModule,  MatDividerModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'angular-bingo';
    private intervalSubscription: Subscription | undefined;
    secondsInterval = 3000; // 3 seconds in milliseconds

    call = shuffle(Array.from({length: 75}, (_, i) => i + 1))

    callIndex: number = -1

    constructor(private ttsService: TextToSpeechService) {
        console.log("Randomized Call Order: ", this.call)
    }

    start(): void {
        if (typeof this.intervalSubscription === 'undefined') {
            console.log("setting sub")
            this.intervalSubscription = interval(this.secondsInterval).subscribe(() => {
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
        this.sayRow("n " + this.call[this.callIndex])
    }

    sayRow(row:string): void {
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

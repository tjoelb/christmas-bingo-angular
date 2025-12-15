import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class TextToSpeechService {
    // Check for browser support
    private synthesis = window.speechSynthesis;

    speak(text: string, rate: number = 1): void {
        if (this.synthesis && 'speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US'; // Set language
            utterance.rate = rate;     // Set speed (rate)
            this.synthesis.speak(utterance);
        } else {
            console.error('Speech synthesis not supported in this browser.');
        }
    }
}

import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { TextToSpeechService } from './text-to-speech.service';

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppComponent],
            providers: [
                {
                    provide: TextToSpeechService,
                    useValue: { speak: jasmine.createSpy('speak') }
                }
            ]
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should render the bingo caller heading', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const heading: HTMLElement = fixture.nativeElement.querySelector('h1');
        expect(heading.textContent).toContain('Current number');
    });
});

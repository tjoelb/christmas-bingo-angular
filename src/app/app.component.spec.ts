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
        const label: HTMLElement = fixture.nativeElement.querySelector('.panel-label');
        expect(label.textContent).toContain('Current number');
    });

    it('should update the caller status when starting and stopping', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const status: HTMLElement = fixture.nativeElement.querySelector('.status');

        fixture.nativeElement.querySelector('.start-button').click();
        fixture.detectChanges();
        expect(status.textContent).toContain('Calling');

        fixture.nativeElement.querySelector('.stop-button').click();
        fixture.detectChanges();
        expect(status.textContent).toContain('Ready to call');
    });

    it('should keep only the three most recent previous calls', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;

        app.callNumber();
        const oldestCall = app.currentCall;
        app.callNumber();
        app.callNumber();
        app.callNumber();
        app.callNumber();

        expect(app.previousCalls.length).toBe(3);
        expect(app.previousCalls).not.toContain(oldestCall);
    });

    it('should not count a number more than once when quick-call buttons repeat', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        app.called = [16];

        app.iMarkCalled();
        app.iMarkCalled();
        app.nMarkCalled();
        app.nMarkCalled();
        app.gMarkCalled();
        app.gMarkCalled();

        expect(app.called.length).toBe(45);
        expect(new Set(app.called).size).toBe(45);
    });
});

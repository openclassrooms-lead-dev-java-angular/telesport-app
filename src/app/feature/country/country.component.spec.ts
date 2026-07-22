import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryComponent } from './country.component';
import { provideRouter } from '@angular/router';

describe('CountryComponent', () => {
    let component: CountryComponent;
    let fixture: ComponentFixture<CountryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CountryComponent],
            providers: [
                provideRouter([])
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(CountryComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

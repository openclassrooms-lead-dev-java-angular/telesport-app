import { Component } from '@angular/core';
import { ButtonComponent } from "src/app/shared/components/button/button.component";

@Component({
    selector: 'app-not-found',
    imports: [ButtonComponent],
    templateUrl: './not-found.component.html',
    styleUrl: './not-found.component.scss',
    standalone: true
})
export class NotFoundComponent { }

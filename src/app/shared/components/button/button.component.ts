import { Component, input } from '@angular/core';
import { ɵɵRouterLink } from "@angular/router/testing";

@Component({
    selector: 'app-button',
    imports: [ɵɵRouterLink],
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss',
    standalone: true
})
export class ButtonComponent {
    variant = input<'primary' | 'secondary' | 'none'>('none');
    outlined = input<boolean>(false);
    size = input<'sm' | 'md' | 'lg'>('md');
    link = input<string>('');

}

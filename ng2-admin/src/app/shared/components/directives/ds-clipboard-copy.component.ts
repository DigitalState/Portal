import { Component, HostListener, Input, ElementRef } from '@angular/core';

import { ClipboardService } from './clipboard.service';

@Component({
    selector: 'ds-clipboard-copy',
    template: `
        <span class="clipboard-target">
            <ng-content></ng-content>
            <a (click)="onClick()" class="btn btn-icon fa fa-clipboard fade position-relative" 
               title="{{ 'general.copyToClipboard' | translate }}" 
               ngxClipboard [cbContent]="copyContent">
                <i class="fa fa-check animated fade text-success position-absolute position-right-0 v-center"></i>
            </a>
        </span>`,
    host: {
        class: 'ds-clipboard-copy'
    }
})
export class DsClipboardCopyComponent {
    @Input() public copyContent: string;


    constructor(private elementRef:ElementRef) {

    }

    ngOnInit(): void {

    }

    @HostListener('mouseover')
    protected onMouseOver() {
        jQuery(this.elementRef.nativeElement).find('.fa-clipboard').addClass('show');
    }

    @HostListener('mouseout')
    protected onMouseOut() {
        jQuery(this.elementRef.nativeElement).find('.fa-clipboard').removeClass('show');
    }

    protected onClick() {
        const $checkMark = jQuery(this.elementRef.nativeElement).find('.fa-check');
        $checkMark.addClass('fadeIn');

        setTimeout(() => {
            $checkMark.removeClass('fadeIn');
        }, 3000);
    }
}
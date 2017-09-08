
import {
    AfterContentInit, AfterViewInit, Component, ElementRef, HostListener, TemplateRef,
    ViewChild
} from '@angular/core';

import 'style-loader!../styles/timeline.scss';

/**
 * Use the class `timeline-large` on the host tag to use the responsive, double-sided layout.
 */
@Component({
    selector: 'timeline',
    // templateUrl: '../templates/timeline-sample.template.html',
    template: `
		<section class="cd-timeline cd-container cssanimations">
            <ng-content></ng-content>
        </section>
    `,
    host: {
        class: 'timeline'
    }
})
export class DsTimelineComponent implements AfterContentInit {

    $timeline_block: any;

    constructor(private elementRef:ElementRef) {

    }

    ngAfterContentInit() {
        let $hostEl = jQuery(this.elementRef.nativeElement);
        this.$timeline_block = $hostEl.find('.cd-timeline-block');
        setTimeout(() => {
            if (this.$timeline_block) {
            // Hide timeline blocks that are outside the viewport
                this.$timeline_block.each(() => {
                    if($hostEl.offset().top > jQuery(window).scrollTop()+jQuery(window).height()*0.75) {
                        $hostEl.find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
                    }
                });
            }
        });
    }

    /**
     * On scroll, show/animate timeline blocks when enter the viewport
     */
    @HostListener('window:scroll')
    protected onWindowScroll() {

        this.$timeline_block.each(() => {
            let $this = jQuery(this.elementRef.nativeElement);
            var windowDiff = jQuery(window).height() - (jQuery(window).height() * 0.75);
            var fadeOffset = $this.offset().top + $this.height();
            var scrollPos = jQuery(window).scrollTop();

            if( $this.offset().top <= jQuery(window).scrollTop()+jQuery(window).height()*0.75 && $this.find('.cd-timeline-img').hasClass('is-hidden') ) {
                $this.find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
            }
            else if (fadeOffset < (scrollPos + windowDiff)) {
                // console.log("Fade Offset: " + fadeOffset);
                // console.log("Fade Position: " + (scrollPos + windowDiff))
                $this.find('.cd-timeline-img, .cd-timeline-content').removeClass('bounce-in').addClass('is-hidden');
            }
        });
    }

    ngOnDestroy() {
        if (this.$timeline_block) {
            this.$timeline_block = undefined;
        }
    }

}

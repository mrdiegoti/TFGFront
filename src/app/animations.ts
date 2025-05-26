import { trigger, transition, style, animate } from '@angular/animations';

export const fadeInUp = (timing: string) => trigger('fadeInUp', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(20px)' }),
    animate(timing, style({ opacity: 1, transform: 'translateY(0)' }))
  ])
]);

export const nbaFadeIn = trigger('nbaFadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('400ms cubic-bezier(0.4, 0, 0.2, 1)')
  ])
]);
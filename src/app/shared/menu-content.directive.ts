import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appMenuContent]'
})
export class MenuContentDirective {

  constructor(public viewContainerRef: ViewContainerRef) {
  }

}

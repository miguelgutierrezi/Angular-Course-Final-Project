import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('data-toggle.dropdown') isOpen = false;
  constructor() {
  }

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}

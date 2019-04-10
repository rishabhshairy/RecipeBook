import { Directive, Input, HostBinding, OnInit, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropDownDirective]',
  exportAs: 'appDropDownDirective'
})
export class DropDownDirectiveDirective implements OnInit {

  @HostBinding('class.open') isOpen = false ;
  constructor() { }
  ngOnInit(){
    
  }
  @HostListener('click') toggleOpen(){
    this.isOpen = !this.isOpen;
  }
}

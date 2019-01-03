import{Directive, HostBinding, HostListener} from '@angular/core'

@Directive({
    selector:'[dropdownMenuItemHover]'
})

export class DropdownMenuItemDirective{
  
  @HostBinding ('class.active') isHovered = false;

  @HostListener ('mouseenter') onmouseenter(){
      this.isHovered=true;
  }

  @HostListener('mouseleave') onmouseleave(){
    this.isHovered=false;
  }
}
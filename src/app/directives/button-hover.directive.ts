import{Directive, HostBinding, HostListener} from '@angular/core'

@Directive({
    selector:'[appButtonHover]'
})

export class ButtonHoverDirective{
  
  @HostBinding ('class.button-hovered') isHovered = false;

  @HostListener ('mouseenter') onmouseenter(){
      this.isHovered=true;
  }

  @HostListener('mouseleave') onmouseleave(){
    this.isHovered=false;
  }
}
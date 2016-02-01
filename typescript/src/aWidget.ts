import {Component, Input, HostBinding, HostListener, ElementRef} from "angular2/core";
import {AGridService} from "./aGridService";
import {ADraggable} from "./aDraggable";

@Component({
  selector: "[aWidget]",
  template: `<ng-content></ng-content>`,
  styles: [`
    :host {
      position: absolute;
      top: 0;
      left: 0;
      background: red;
      box-shadow: 0 0 5px rgba(0, 0, 0, .4);
    }
  `],
  host: {
    "[style.pointerEvents]": "stylePointerEvents"
  }
})
export class AWidget extends ADraggable {
  public x = 0;
  public y = 0;
  public width = 2;
  public height = 1;
  public fixed = true;
  public fixedTimeout: any;

  constructor(elementRef: ElementRef, grid: AGridService) {
    super(elementRef, grid);
  }

  ngOnInit() {
    this.grid.add(this);
  }

  @HostListener("mousedown", ['$event'])
  startDrag(event: MouseEvent) {
    this.grid.setWidget(this, null);
    clearTimeout(this.fixedTimeout);
    this.fixed = false;
    this.dragLeft = this.styleLeft;
    this.dragTop = this.styleTop;
    super.startDrag(event);
  }

  drop(event: MouseEvent) {
    this.grid.placeWidgetOnColumn(this, this.grid.getNearestColumn(this.styleLeft), this.grid.getNearestRow(this.styleTop));
    this.fixedTimeout = setTimeout(() => {
        this.fixed = true;
    }, 200);
    super.drop(event);
  }

  @HostBinding("style.left.px")
  get styleLeft(): number {
    return this.dragging ? this.dragLeft : this.grid.margin * (this.x + 1) + this.grid.size * this.x;
  }

  @HostBinding("style.top.px")
  get styleTop(): number {
    return this.dragging ? this.dragTop : this.grid.margin * (this.y + 1) + this.grid.size * this.y;
  }

  @HostBinding("style.width.px")
  get styleWidth(): number {
    return this.grid.margin * (this.width - 1) + this.grid.size * this.width;
  }

  @HostBinding("style.height.px")
  get styleHeight(): number {
    return this.grid.margin * (this.height - 1) + this.grid.size * this.height;
  }

  @HostBinding("style.transition")
  get styleTransition(): string {
    return this.dragging ? "none" : "0.2s left, 0.2s top";
  }

  @HostBinding("style.z-index")
  get styleZIndex(): string {
    return this.fixed ? "auto" : "100";
  }
}

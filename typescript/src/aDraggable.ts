import {Directive, HostListener, HostBinding, ElementRef, Output, Input, EventEmitter} from "angular2/core";
import {AGridService} from "./aGridService";

export class ADraggable {
  private mouseMoveListener: (event: MouseEvent) => void = null;
  private mouseUpListener: (event: MouseEvent) => void = null;
  private offsetX: number;
  private offsetY: number;
  private boundingRect: ClientRect;

  @HostBinding("style.position") pos = "absolute";
  @HostBinding("style.left.px") dragLeft = 0;
  @HostBinding("style.top.px") dragTop = 0;

  @HostBinding("style.pointer-events")
  public get stylePointerEvents(): string {
    return this.dragging ? "none" : "auto";
  }

  public dragging: boolean = false;

  @Output()
  public dropped = new EventEmitter(true);

  constructor(protected elementRef: ElementRef, protected grid: AGridService) {
  }

  @HostListener("mousedown", ['$event'])
  startDrag(event: MouseEvent) {
    let e = this.elementRef.nativeElement as HTMLElement;
    this.offsetX = event.offsetX;
    this.offsetY = event.offsetY;
    this.boundingRect = (e.parentNode as HTMLElement).getBoundingClientRect();
    this.dragging = true;

    this.clearListeners(); // Make sure to clean up old listeners

    this.mouseMoveListener = (event: MouseEvent) => this.onDrag(event);
    this.mouseUpListener = (event: MouseEvent) => this.drop(event);
    window.addEventListener("mousemove", this.mouseMoveListener, true);
    window.addEventListener("mouseup", this.mouseUpListener, true);
    event.preventDefault();
  }

  onDrag(event: MouseEvent) {
    this.dragLeft = Math.max(event.pageX - this.boundingRect.left - this.offsetX);
    this.dragTop = Math.max(event.pageY - this.boundingRect.top - this.offsetY);

    // this.ghost.style.top = this.roundTop(this.top) + "px";
    // this.ghost.style.left = this.roundLeft(this.left) + "px";
  }

  drop(event: MouseEvent) {
    this.dragging = false;
    this.clearListeners();
  }

  clearListeners() {
    if (this.mouseMoveListener != null) {
      window.removeEventListener("mousemove", this.mouseMoveListener, true);
      this.mouseMoveListener = null;
    }
    if (this.mouseUpListener != null) {
      window.removeEventListener("mouseup", this.mouseUpListener, true);
      this.mouseUpListener = null;
    }
  }

  // roundLeft(left: number) {
  //   let x = Math.round(left / (this.gridSize + this.gridPadding));
  //   return this.gridPadding + x * this.gridPadding + x * this.gridSize;
  // }
  //
  // roundTop(top: number) {
  //   let y = Math.round(top / (this.gridSize + this.gridPadding));
  //   return this.gridPadding + y * this.gridPadding + y * this.gridSize;
  // }
}

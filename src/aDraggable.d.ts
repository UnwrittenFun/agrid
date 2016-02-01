import { ElementRef, EventEmitter } from "angular2/core";
import { AGridService } from "./aGridService";
export declare class ADraggable {
    protected elementRef: ElementRef;
    protected grid: AGridService;
    private mouseMoveListener;
    private mouseUpListener;
    private offsetX;
    private offsetY;
    private boundingRect;
    pos: string;
    dragLeft: number;
    dragTop: number;
    stylePointerEvents: string;
    dragging: boolean;
    dropped: EventEmitter<{}>;
    constructor(elementRef: ElementRef, grid: AGridService);
    startDrag(event: MouseEvent): void;
    onDrag(event: MouseEvent): void;
    drop(event: MouseEvent): void;
    clearListeners(): void;
}

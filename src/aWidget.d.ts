import { ElementRef } from "angular2/core";
import { AGridService } from "./aGridService";
import { ADraggable } from "./aDraggable";
export declare class AWidget extends ADraggable {
    x: number;
    y: number;
    width: number;
    height: number;
    fixed: boolean;
    fixedTimeout: any;
    constructor(elementRef: ElementRef, grid: AGridService);
    ngOnInit(): void;
    startDrag(event: MouseEvent): void;
    drop(event: MouseEvent): void;
    styleLeft: number;
    styleTop: number;
    styleWidth: number;
    styleHeight: number;
    styleTransition: string;
    styleZIndex: string;
}

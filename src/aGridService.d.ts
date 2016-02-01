import { AWidget } from "./aWidget";
export declare class AGridService {
    gridmap: AWidget[][];
    size: number;
    margin: number;
    fallThrough: boolean;
    init(width: number, height: number): void;
    add(widget: AWidget): boolean;
    destroy(): void;
    setWidget(widget: AWidget, value?: any, update?: boolean): void;
    isOccupied(x: number, y: number, width: number, height: number): boolean;
    getNearestColumn(left: number): number;
    getNearestRow(top: number): number;
    placeWidgetOnColumn(widget: AWidget, column: number, minRow?: number, update?: boolean): void;
    trySetWidget(widget: AWidget, x: number, y: number, update?: boolean): boolean;
    updateWidget(widget: AWidget, x: number, y: number, update?: boolean): void;
}
export interface Coords {
    x: number;
    y: number;
    width: number;
    height: number;
}

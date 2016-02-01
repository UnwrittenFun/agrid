import { OnDestroy } from "angular2/core";
import { AGridService } from "./aGridService";
export declare class AGrid implements OnDestroy {
    private grid;
    sizeInfo: number[];
    constructor(grid: AGridService);
    ngOnInit(): void;
    ngOnDestroy(): void;
}

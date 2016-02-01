"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("angular2/core");
var aGridService_1 = require("./aGridService");
var AGrid = (function () {
    function AGrid(grid) {
        this.grid = grid;
        this.sizeInfo = [100, 8];
        this.grid.init(10, 6);
    }
    AGrid.prototype.ngOnInit = function () {
        this.grid.size = this.sizeInfo[0];
        this.grid.margin = this.sizeInfo[1];
    };
    AGrid.prototype.ngOnDestroy = function () {
        this.grid.destroy();
    };
    __decorate([
        core_1.Input("aGrid"), 
        __metadata('design:type', Array)
    ], AGrid.prototype, "sizeInfo", void 0);
    AGrid = __decorate([
        core_1.Component({
            selector: "[aGrid]",
            providers: [aGridService_1.AGridService],
            template: "<ng-content></ng-content>"
        }), 
        __metadata('design:paramtypes', [aGridService_1.AGridService])
    ], AGrid);
    return AGrid;
}());
exports.AGrid = AGrid;
//# sourceMappingURL=aGrid.js.map
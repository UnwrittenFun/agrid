"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var aDraggable_1 = require("./aDraggable");
var AWidget = (function (_super) {
    __extends(AWidget, _super);
    function AWidget(elementRef, grid) {
        _super.call(this, elementRef, grid);
        this.x = 0;
        this.y = 0;
        this.width = 2;
        this.height = 1;
        this.fixed = true;
    }
    AWidget.prototype.ngOnInit = function () {
        this.grid.add(this);
    };
    AWidget.prototype.startDrag = function (event) {
        this.grid.setWidget(this, null);
        clearTimeout(this.fixedTimeout);
        this.fixed = false;
        this.dragLeft = this.styleLeft;
        this.dragTop = this.styleTop;
        _super.prototype.startDrag.call(this, event);
    };
    AWidget.prototype.drop = function (event) {
        var _this = this;
        this.grid.placeWidgetOnColumn(this, this.grid.getNearestColumn(this.styleLeft), this.grid.getNearestRow(this.styleTop));
        this.fixedTimeout = setTimeout(function () {
            _this.fixed = true;
        }, 200);
        _super.prototype.drop.call(this, event);
    };
    Object.defineProperty(AWidget.prototype, "styleLeft", {
        get: function () {
            return this.dragging ? this.dragLeft : this.grid.margin * (this.x + 1) + this.grid.size * this.x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AWidget.prototype, "styleTop", {
        get: function () {
            return this.dragging ? this.dragTop : this.grid.margin * (this.y + 1) + this.grid.size * this.y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AWidget.prototype, "styleWidth", {
        get: function () {
            return this.grid.margin * (this.width - 1) + this.grid.size * this.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AWidget.prototype, "styleHeight", {
        get: function () {
            return this.grid.margin * (this.height - 1) + this.grid.size * this.height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AWidget.prototype, "styleTransition", {
        get: function () {
            return this.dragging ? "none" : "0.2s left, 0.2s top";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AWidget.prototype, "styleZIndex", {
        get: function () {
            return this.fixed ? "auto" : "100";
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.HostListener("mousedown", ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [MouseEvent]), 
        __metadata('design:returntype', void 0)
    ], AWidget.prototype, "startDrag", null);
    __decorate([
        core_1.HostBinding("style.left.px"), 
        __metadata('design:type', Number)
    ], AWidget.prototype, "styleLeft", null);
    __decorate([
        core_1.HostBinding("style.top.px"), 
        __metadata('design:type', Number)
    ], AWidget.prototype, "styleTop", null);
    __decorate([
        core_1.HostBinding("style.width.px"), 
        __metadata('design:type', Number)
    ], AWidget.prototype, "styleWidth", null);
    __decorate([
        core_1.HostBinding("style.height.px"), 
        __metadata('design:type', Number)
    ], AWidget.prototype, "styleHeight", null);
    __decorate([
        core_1.HostBinding("style.transition"), 
        __metadata('design:type', String)
    ], AWidget.prototype, "styleTransition", null);
    __decorate([
        core_1.HostBinding("style.z-index"), 
        __metadata('design:type', String)
    ], AWidget.prototype, "styleZIndex", null);
    AWidget = __decorate([
        core_1.Component({
            selector: "[aWidget]",
            template: "<ng-content></ng-content>",
            styles: ["\n    :host {\n      position: absolute;\n      top: 0;\n      left: 0;\n      background: red;\n      box-shadow: 0 0 5px rgba(0, 0, 0, .4);\n    }\n  "],
            host: {
                "[style.pointerEvents]": "stylePointerEvents"
            }
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, aGridService_1.AGridService])
    ], AWidget);
    return AWidget;
}(aDraggable_1.ADraggable));
exports.AWidget = AWidget;
//# sourceMappingURL=aWidget.js.map
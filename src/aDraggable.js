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
var ADraggable = (function () {
    function ADraggable(elementRef, grid) {
        this.elementRef = elementRef;
        this.grid = grid;
        this.mouseMoveListener = null;
        this.mouseUpListener = null;
        this.pos = "absolute";
        this.dragLeft = 0;
        this.dragTop = 0;
        this.dragging = false;
        this.dropped = new core_1.EventEmitter(true);
    }
    Object.defineProperty(ADraggable.prototype, "stylePointerEvents", {
        get: function () {
            return this.dragging ? "none" : "auto";
        },
        enumerable: true,
        configurable: true
    });
    ADraggable.prototype.startDrag = function (event) {
        var _this = this;
        var e = this.elementRef.nativeElement;
        this.offsetX = event.offsetX;
        this.offsetY = event.offsetY;
        this.boundingRect = e.parentNode.getBoundingClientRect();
        this.dragging = true;
        this.clearListeners(); // Make sure to clean up old listeners
        this.mouseMoveListener = function (event) { return _this.onDrag(event); };
        this.mouseUpListener = function (event) { return _this.drop(event); };
        window.addEventListener("mousemove", this.mouseMoveListener, true);
        window.addEventListener("mouseup", this.mouseUpListener, true);
        event.preventDefault();
    };
    ADraggable.prototype.onDrag = function (event) {
        this.dragLeft = Math.max(event.pageX - this.boundingRect.left - this.offsetX);
        this.dragTop = Math.max(event.pageY - this.boundingRect.top - this.offsetY);
        // this.ghost.style.top = this.roundTop(this.top) + "px";
        // this.ghost.style.left = this.roundLeft(this.left) + "px";
    };
    ADraggable.prototype.drop = function (event) {
        this.dragging = false;
        this.clearListeners();
    };
    ADraggable.prototype.clearListeners = function () {
        if (this.mouseMoveListener != null) {
            window.removeEventListener("mousemove", this.mouseMoveListener, true);
            this.mouseMoveListener = null;
        }
        if (this.mouseUpListener != null) {
            window.removeEventListener("mouseup", this.mouseUpListener, true);
            this.mouseUpListener = null;
        }
    };
    __decorate([
        core_1.HostBinding("style.position"), 
        __metadata('design:type', Object)
    ], ADraggable.prototype, "pos", void 0);
    __decorate([
        core_1.HostBinding("style.left.px"), 
        __metadata('design:type', Object)
    ], ADraggable.prototype, "dragLeft", void 0);
    __decorate([
        core_1.HostBinding("style.top.px"), 
        __metadata('design:type', Object)
    ], ADraggable.prototype, "dragTop", void 0);
    __decorate([
        core_1.HostBinding("style.pointer-events"), 
        __metadata('design:type', String)
    ], ADraggable.prototype, "stylePointerEvents", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ADraggable.prototype, "dropped", void 0);
    __decorate([
        core_1.HostListener("mousedown", ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [MouseEvent]), 
        __metadata('design:returntype', void 0)
    ], ADraggable.prototype, "startDrag", null);
    return ADraggable;
}());
exports.ADraggable = ADraggable;
//# sourceMappingURL=aDraggable.js.map
"use strict";
var AGridService = (function () {
    function AGridService() {
        this.gridmap = [];
        this.size = 100;
        this.margin = 8;
        this.fallThrough = true;
    }
    AGridService.prototype.init = function (width, height) {
        for (var y = 0; y < height; y++) {
            this.gridmap[y] = [];
            for (var x = 0; x < width; x++) {
                this.gridmap[y][x] = null;
            }
        }
    };
    AGridService.prototype.add = function (widget) {
        if (!this.isOccupied(widget.x, widget.y, widget.width, widget.height)) {
            this.setWidget(widget);
            return true;
        }
        else {
            for (var gridY = 0; gridY < this.gridmap.length; gridY++) {
                for (var gridX = 0; gridX < this.gridmap[gridY].length; gridX++) {
                    if (!this.isOccupied(gridX, gridY, widget.width, widget.height)) {
                        this.updateWidget(widget, gridX, gridY);
                        return true;
                    }
                }
            }
            return false;
        }
    };
    AGridService.prototype.destroy = function () {
        this.gridmap = [];
    };
    AGridService.prototype.setWidget = function (widget, value, update) {
        if (update === void 0) { update = true; }
        var maxY = widget.y + widget.height;
        for (var gridY = widget.y; gridY < maxY; gridY++) {
            for (var gridX = widget.x; gridX < widget.x + widget.width; gridX++) {
                this.gridmap[gridY][gridX] = value === undefined ? widget : value;
            }
        }
        // if (update) {
        //   for (let x = 0; x < widget.width; x++) {
        //     this.triggerWidgetUpdate(maxY, widget.x + x, 1);
        //   }
        // }
    };
    AGridService.prototype.isOccupied = function (x, y, width, height) {
        for (var gridY = y; gridY < y + height; gridY++) {
            if (this.gridmap[gridY] == null)
                return true;
            for (var gridX = x; gridX < x + width; gridX++) {
                if (this.gridmap[gridY][gridX] != null)
                    return true;
            }
        }
        return false;
    };
    AGridService.prototype.getNearestColumn = function (left) {
        return Math.max(Math.round(left / (this.size + this.margin)), 0);
    };
    AGridService.prototype.getNearestRow = function (top) {
        return this.getNearestColumn(top);
    };
    AGridService.prototype.placeWidgetOnColumn = function (widget, column, minRow, update) {
        // if (this.fallThrough && minRow > 0) {
        //   let row = -1;
        //   for (let y = minRow; y >= 0; y--) {
        //     if (!this.isOccupied(column, y, widget.width, widget.height)) {
        //       row = y;
        //     } else {
        //       break;
        //     }
        //   }
        //   if (row > -1) {
        //     this.updateWidget(widget, column, row, update);
        //     return;
        //   }
        // }
        if (minRow === void 0) { minRow = 0; }
        if (update === void 0) { update = true; }
        for (var y = minRow; true; y++) {
            if (this.gridmap[y] == null) {
                this.gridmap[y] = [];
            }
            if (this.trySetWidget(widget, column, y, update)) {
                return;
            }
        }
    };
    AGridService.prototype.trySetWidget = function (widget, x, y, update) {
        if (update === void 0) { update = true; }
        if (!this.isOccupied(x, y, widget.width, widget.height)) {
            this.updateWidget(widget, x, y);
            return true;
        }
        return false;
    };
    AGridService.prototype.updateWidget = function (widget, x, y, update) {
        if (update === void 0) { update = true; }
        widget.x = x;
        widget.y = y;
        this.setWidget(widget, widget, update);
    };
    return AGridService;
}());
exports.AGridService = AGridService;
//# sourceMappingURL=aGridService.js.map
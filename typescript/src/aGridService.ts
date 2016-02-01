import {AWidget} from "./aWidget";

export class AGridService {
  public gridmap: AWidget[][] = [];
  public size = 100;
  public margin = 8;
  public fallThrough = true;

  init(width: number, height: number) {
    for (let y = 0; y < height; y++) {
      this.gridmap[y] = [];
      for (let x = 0; x < width; x++) {
        this.gridmap[y][x] = null;
      }
    }
  }

  add(widget: AWidget) {
    if (!this.isOccupied(widget.x, widget.y, widget.width, widget.height)) {
      this.setWidget(widget);
      return true;
    } else {
      for (let gridY = 0; gridY < this.gridmap.length; gridY++) {
        for (let gridX = 0; gridX < this.gridmap[gridY].length; gridX++) {
          if (!this.isOccupied(gridX, gridY, widget.width, widget.height)) {
            this.updateWidget(widget, gridX, gridY);
            return true;
          }
        }
      }
      return false;
    }
  }

  destroy() {
    this.gridmap = [];
  }

  setWidget(widget: AWidget, value?: any, update = true) {
    let maxY = widget.y + widget.height;
    for (let gridY = widget.y; gridY < maxY; gridY++) {
      for (let gridX = widget.x; gridX < widget.x + widget.width; gridX++) {
        this.gridmap[gridY][gridX] = value === undefined ? widget : value;
      }
    }

    // if (update) {
    //   for (let x = 0; x < widget.width; x++) {
    //     this.triggerWidgetUpdate(maxY, widget.x + x, 1);
    //   }
    // }
  }

  isOccupied(x: number, y: number, width: number, height: number): boolean {
    for (let gridY = y; gridY < y + height; gridY++) {
      if (this.gridmap[gridY] == null) return true;
        for (let gridX = x; gridX < x + width; gridX++) {
        if (this.gridmap[gridY][gridX] != null) return true;
      }
    }
    return false;
  }

  getNearestColumn(left: number) {
    return Math.max(Math.round(left / (this.size + this.margin)), 0);
  }

  getNearestRow(top: number) {
    return this.getNearestColumn(top);
  }

  placeWidgetOnColumn(widget: AWidget, column: number, minRow = 0, update = true) {
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

    for (let y = minRow; true; y++) {
      if (this.gridmap[y] == null) {
        this.gridmap[y] = [];
      }
      if (this.trySetWidget(widget, column, y, update)) {
        return;
      }
    }
  }

  trySetWidget(widget: AWidget, x: number, y: number, update = true) {
    if (!this.isOccupied(x, y, widget.width, widget.height)) {
      this.updateWidget(widget, x, y);
      return true;
    }
    return false;
  }

  updateWidget(widget: AWidget, x: number, y: number, update = true) {
    widget.x = x;
    widget.y = y;
    this.setWidget(widget, widget, update);
  }

  // triggerWidgetUpdate(minRow: number, column: number, width: number) {
  //   for (let row = minRow; row < this.gridmap.length; row++) {
  //     if (this.gridmap[row] == null || this.gridmap[row][column] == null) continue;
  //     let widget = this.gridmap[row][column];
  //     this.setWidget(widget, null, false);
  //     this.placeWidgetOnColumn(widget, widget.x, row, false);
  //     for (let x = 0; x < width; x++) {
  //       this.triggerWidgetUpdate(row + widget.height, column + x, widget.width);
  //     }
  //     return;
  //   }
  // }
}

export interface Coords {
  x: number;
  y: number;
  width: number;
  height: number;
}

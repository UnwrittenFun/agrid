import {Component, Input, OnDestroy} from "angular2/core";
import {AGridService} from "./aGridService";

@Component({
  selector: "[aGrid]",
  providers: [AGridService],
  template: `<ng-content></ng-content>`
})
export class AGrid implements OnDestroy {
  @Input("aGrid")
  public sizeInfo: number[] = [100, 8];

  constructor(private grid: AGridService) {
    this.grid.init(10, 6);
  }

  ngOnInit() {
    this.grid.size = this.sizeInfo[0];
    this.grid.margin = this.sizeInfo[1];
  }

  ngOnDestroy() {
    this.grid.destroy();
  }
}

import Phaser from "phaser";

export default class AlignGrid {
  config: {
    scene: Phaser.Scene;
    rows: number;
    cols: number;
    height: number;
    width: number;
  };
  scene!: Phaser.Scene;
  cw!: number;
  ch!: number;
  graphics: any;
  constructor(config: {
    scene: Phaser.Scene;
    rows: number;
    cols: number;
    height: number;
    width: number;
  }) {
    this.config = config;
    this.scene = config.scene;
    //cell width
    this.cw = config.width / config.cols;
    //cell height
    this.ch = config.height / config.rows;
  }

  show() {
    this.graphics = this.scene.add.graphics();
    this.graphics.lineStyle(2, 0xff0000);

    for (var i = 0; i < this.config.width; i += this.cw) {
      this.graphics.moveTo(i, 0);
      this.graphics.lineTo(i, this.config.height);
    }

    for (var i = 0; i < this.config.height; i += this.ch) {
      this.graphics.moveTo(0, i);
      this.graphics.lineTo(this.config.width, i);
    }

    this.graphics.strokePath();
  }
  height(yy: any) {
    return this.ch * yy + this.ch / 2;
  }
  placeAt(xx: number, yy: any, obj: any) {
    //calc position based upon the cellwidth and cellheight
    var x2 = this.cw * xx + this.cw / 2;
    var y2 = this.ch * yy + this.ch / 2;

    obj.x = x2;
    obj.y = y2;
  }
  placeAtOriginTop(xx: number, yy: number, obj: any) {
    var x2 = this.cw * xx + this.cw / 2;
    var y2 = this.ch * yy + this.ch / 2;
    var height = obj.body.bounds.max.y - obj.body.bounds.min.y;
    var h = height / 2;
    obj.x = x2;
    obj.y = y2 + h;
  }

  placeAtOriginTops(scene: any, xx: number, yy: number, obj: any) {
    var x2 = this.cw * xx + this.cw / 2;
    var y2 = this.ch * yy + this.ch / 2;
    var height = obj.bounds.max.y - obj.bounds.min.y;
    var h = height / 2;
    scene.matter.body.setPosition(obj, {
      x: x2,
      y: y2 + h,
    });
  }
  placeAtOriginBottom(xx: number, yy: number, obj: any) {
    var x2 = this.cw * xx + this.cw / 2;
    var y2 = this.ch * yy + this.ch / 2;
    var height = obj.body.bounds.max.y - obj.body.bounds.min.y;
    var h = height / 2;
    obj.x = x2;
    obj.y = y2 - h;
  }
  placeAtIndex(index: number, obj: any) {
    var yy = Math.floor(index / this.config.cols);
    var xx = index - yy * this.config.cols;

    this.placeAt(xx, yy, obj);
  }
  showNumbers() {
    this.show();
    var count = 0;
    for (var i = 0; i < this.config.rows; i++) {
      for (var j = 0; j < this.config.cols; j++) {
        var numText = this.scene.add.text(0, 0, `${count}`, {
          color: "#ff0000",
        });
        numText.setOrigin(0.5, 0.5);
        this.placeAtIndex(count, numText);

        count++;
      }
    }
  }
}

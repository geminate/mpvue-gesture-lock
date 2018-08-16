class GestureLock {

  constructor(containerWidth, cycleRadius) {
    this.containerWidth = containerWidth;  // 容器宽度
    this.cycleRadius = cycleRadius;  // 圆的半径

    this.circleArray = [];  // 全部圆的对象数组
    this.checkPoints = []; // 选中的圆的对象数组
    this.lineArray = []; // 已激活锁之间的线段数组
    this.lastCheckPoint = 0; // 最后一个激活的锁
    this.offsetX = 0; // 容器的 X 偏移
    this.offsetY = 0;// 容器的 Y 偏移
    this.activeLine = {}; // 最后一个激活的锁与当前位置之间的线段

    this.windowWidth = wx.getSystemInfoSync().windowWidth;// 窗口大小(用于rpx 和 px 转换)

    this.initCircleArray();
  }

  // 初始化 画布上的 9个圆
  initCircleArray() {
    const cycleMargin = (this.containerWidth - 6 * this.cycleRadius) / 6;
    let count = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        count++;
        this.circleArray.push({
          count: count,
          x: (cycleMargin + this.cycleRadius) * (j * 2 + 1),
          y: (cycleMargin + this.cycleRadius) * (i * 2 + 1),
          check: false,
          style: {
            left: (cycleMargin + this.cycleRadius) * (j * 2 + 1) - this.cycleRadius + 'rpx',
            top: (cycleMargin + this.cycleRadius) * (i * 2 + 1) - this.cycleRadius + 'rpx',
            width: this.cycleRadius * 2 + 'rpx',
          }
        });
      }
    }
  }

  // 使 画布 恢复初始状态
  reset() {
    this.circleArray.forEach((item) => {
      item.check = false;
    });
    this.checkPoints = [];
    this.lineArray = [];
    this.activeLine = {};
    this.lastCheckPoint = 0;
  }

  onTouchStart(e) {
    this.setOffset(e);
    this.checkTouch(e);
  }

  onTouchMove(e) {
    this.drawCanvas(e)
  }

  onTouchEnd(e) {
    this.reset();
  }

  // 初始化 偏移量
  setOffset(e) {
    this.offsetX = e.currentTarget.offsetLeft;
    this.offsetY = e.currentTarget.offsetTop;
  }

  // 检测当时 触摸位置是否位于 锁上
  checkTouch(e) {
    for (let i = 0; i < this.circleArray.length; i++) {
      let point = this.circleArray[i];
      if (this.isPointInCycle(this.pxTorpx(e.pageX - this.offsetX), this.pxTorpx(e.pageY - this.offsetY), point.x, point.y, this.cycleRadius)) {
        if (!point.check) {
          this.checkPoints.push(point);
          if (this.lastCheckPoint != 0) {
            // 在这里 画之前存在的 线
            const line = this.drawLine(this.lastCheckPoint, point);
            this.lineArray.push(line);
          }


          this.lastCheckPoint = point;
        }
        point.check = true;
        return;
      }
    }

  }

  drawLine(start, end) {

    const width = Math.sqrt((start.x - end.x) * (start.x - end.x) + (start.y - end.y) * (start.y - end.y));
    const rotate = this.getAngle(start, end);
    const left = this.rpxTopx(start.x);
    const top = this.rpxTopx(start.y);

    return {
      activeLeft: left + 'px',
      activeTop: top + 'px',
      activeWidth: this.rpxTopx(width) + 'px',
      activeRotate: rotate + 'deg'
    }

  }

  getAngle(start, end) {
    var diff_x = end.x - start.x, diff_y = end.y - start.y;
    if (diff_x == 0) {
      return 360 * Math.atan(diff_y / diff_x) / (2 * Math.PI);
    }
    if (diff_x > 0) {
      return 360 * Math.atan(diff_y / diff_x) / (2 * Math.PI);
    } else {
      return 180 + 360 * Math.atan(diff_y / diff_x) / (2 * Math.PI);
    }
  }

  isPointInCycle(x, y, circleX, circleY, radius) {
    return (this.getPointDis(x, y, circleX, circleY) < radius) ? true : false;
  }

  getPointDis(ax, ay, bx, by) {
    return Math.sqrt(Math.pow(ax - bx, 2) + Math.pow(ay - by, 2));
  }

  drawCanvas(e) {
    // 画经过的圆
    this.checkTouch(e);

    // 画新的线
    this.activeLine = this.drawLine(this.lastCheckPoint, {
      x: this.pxTorpx(e.pageX - this.offsetX),
      y: this.pxTorpx(e.pageY - this.offsetY)
    });
    console.log(this.activeLine);

  }

  // 获取 activeLine
  getActiveLine() {
    return this.activeLine;
  }

  // 获取 圆对象数组
  getCycleArray() {
    return this.circleArray;
  }

  getLineArray() {
    return this.lineArray;
  }

  // 将 RPX 转换成 PX
  rpxTopx(rpx) {
    return rpx / 750 * this.windowWidth;
  }

  // 将 PX 转换成 RPX
  pxTorpx(px) {
    return px * 750 / this.windowWidth;
  }

}

export default GestureLock;

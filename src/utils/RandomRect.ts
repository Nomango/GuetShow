interface Options {
  width?: number;
  height?: number;
  minMargin?: number;
  total?: number;
}

interface RectangleOptions {
  x: number;
  y: number;
  width: number;
  height: number;
}

const SIZE = (window.innerWidth * 30) / 375;

function checkRect(rect1: Rectangle, rect2: Rectangle) {
  const startX1 = rect1.x;
  const startY1 = rect1.y;
  const endX1 = startX1 + rect1.width;
  const endY1 = startY1 + rect1.height;

  const startX2 = rect2.x;
  const startY2 = rect2.y;
  const endX2 = startX2 + rect2.width;
  const endY2 = startY2 + rect2.height;

  return !(
    endY2 < startY1 ||
    endY1 < startY2 ||
    startX1 > endX2 ||
    startX2 > endX1
  );
}

/** 每一个元素的盒子位置、大小 */
class Rectangle {
  x = 0;
  y = 0;
  width = 0;
  height = 0;

  constructor(options: RectangleOptions) {
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
  }

  isInside(r: any) {
    return checkRect(this, r) || checkRect(r, this);
  }
}

export class RandomRect {
  winWidth = 0;
  winHeight = 0;
  minMargin = 0;
  total = 0;
  rectArray: Rectangle[] = [];
  disableRect: any;

  constructor(options?: Options) {
    this.winWidth = options?.width || window.innerWidth - 10;
    this.winHeight = options?.height || window.innerHeight - 10;
    this.minMargin = options?.minMargin || 20;
    this.total = options?.total || 10;
    this.rectArray = [];
    this.disableRect = {};
    this.getDisableRect();
    this.init();
  }

  getDisableRect() {
    const rect1 = document.getElementById("header-description");
    const rect2 = document.getElementById("header-title");

    if (rect1 && rect2) {
      const bounding1 = rect1.getBoundingClientRect();
      const bounding2 = rect2.getBoundingClientRect();

      this.disableRect.x = bounding1.left;
      this.disableRect.y = bounding1.top;
      this.disableRect.width = bounding2.width;
      this.disableRect.height = bounding1.height;

      console.log("aaaa", this.disableRect);
    }
  }

  /** 检查是否在视窗内 */
  checkInside(item: any) {
    const { x, y } = item;
    return (
      x > 0 &&
      y > 0 &&
      x < this.winWidth &&
      y < this.winHeight &&
      x + SIZE < this.winWidth &&
      y + SIZE < this.winHeight
    );
  }

  init() {
    let rect: any;
    let x;
    let y;
    let isInside;
    let i;
    let counter = 0;

    for (i = 0; i < 12; i++) {
      counter = 0;
      do {
        counter++;
        x = (Math.random() * this.winWidth) | 0;
        y = (Math.random() * this.winHeight) | 0;

        rect = new Rectangle({
          x,
          y,
          width: SIZE,
          height: SIZE
        });

        isInside = this.rectArray.some(item => {
          return item.isInside(rect);
        });
      } while (isInside && counter < 1000);

      if (this.checkInside(rect) && counter < 1000 && rect) {
        this.rectArray.push(rect);
      }
    }
  }

  getRect() {
    return this.rectArray;
  }
}

import { ImageElementWidget } from "@dj256/tuiomanager/widgets";

export class PipeElementWidget extends ImageElementWidget {
  constructor(x, y, type) {
    let src = "";
    let category = "";
    let height = 100;

    switch (type) {
      case "straight":
        src = "./assets/images/pipe_straight.svg";
        category = "straight";
        break;
      case "curved":
        src = "./assets/images/pipe_curved.svg";
        category = "curved";
        break;
      case "t-shape":
        src = "./assets/images/pipe_t_shape.svg";
        category = "t-shape";
        break;
      case "long":
        src = "./assets/images/pipe_long.svg";
        category = "long";
        height = 200;
        break;
      default:
        break;
    }
    super(x, y, 100, height, 0, 1, src);
    if (type === "long") {
      this.domElem.get(0).style.transformOrigin = "center";
    }
    this.domElem.get(0).classList.add("pipe");
    this.tagFirstPosition = { x: 0, y: 0 };
    this.tagOffset = { x: 0, y: 0 };
    this.category = category;
    this.angle = 0;
    this.tagCurrentAngle = 0;
  }

  // eslint-disable-next-line no-unused-vars
  _onTouchCreation(_) {}

  // eslint-disable-next-line no-unused-vars
  _onTouchUpdate(_) {}

  // eslint-disable-next-line no-unused-vars
  _onTouchDeletion(_) {}
}

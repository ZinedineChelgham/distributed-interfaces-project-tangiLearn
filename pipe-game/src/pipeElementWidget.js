import { ImageElementWidget } from "@dj256/tuiomanager/widgets";

export class PipeElementWidget extends ImageElementWidget {
  constructor(x, y, type) {
    let src = ""
    let category = ""
    switch (type) {
      case "straight":
        src = "./assets/images/pipe_straight.svg"
        category = "straight"
        break;
      case "curved":
        src = "./assets/images/pipe_curved.svg"
        category = "curved"
        break;
      case "t-shape":
        src = "./assets/images/pipe_t_shape.svg"
        category = "t-shape"
        break;
      default:
        break;
    }
    super(x, y, 100, 100, 0, 1, src);
    this.tagFirstPosition = { x: 0, y: 0 }
    this.tagOffset = { x: 0, y: 0 }
    this.category = category
    this.angle = 0
    this.tagCurrentAngle = 0
  }
}

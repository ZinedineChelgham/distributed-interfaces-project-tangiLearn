import { ImageElementWidget } from "@dj256/tuiomanager/widgets";

export class PipeElementWidget extends ImageElementWidget {
  constructor(x, y, width, height, initialRotation, initialScale, src) {
    super(x, y, width, height, initialRotation, initialScale, src);
    this.angle = 0
    this.tagCurrentAngle = 0
  }
}

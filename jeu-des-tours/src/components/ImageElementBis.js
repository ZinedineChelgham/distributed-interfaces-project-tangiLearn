import { ImageElementWidget } from "@dj256/tuiomanager/widgets";
export class ImageElementBis extends ImageElementWidget {
    constructor(x, y, width, height, initialRotation, initialScale, src, idImage) {
        super(x, y, width, height, initialRotation, initialScale, src);
        this.idImage = idImage;
    }
}
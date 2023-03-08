import {DynamicCircle} from "./DynamicCircle.js";

export class Player extends DynamicCircle {

    radius = 30;

    constructor() {
        super();
        this.position = {
            x: this.canvas.getCanvasRect().width / 2,
            y: this.canvas.getCanvasRect().height / 2,
        }
    }

    draw() {
        super.drawHPBar()

        const img = new Image();
        img.src = "images/ebalo.png";
        this.ctx.drawImage(
            img,
            this.position.x - this.radius,
            this.position.y - this.radius,
            this.radius * 2,
            this.radius * 2,
        );
    }
}
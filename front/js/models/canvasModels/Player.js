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
        this.ctx.fillStyle = 'rgba(167,255,240,0)'
        super.draw()

        const img = new Image();
        img.src = "images/ebalo.png";
        this.ctx.drawImage(
            img,
            this.position.x - 30,
            this.position.y - 30,
            60,
            60
        );
    }
}
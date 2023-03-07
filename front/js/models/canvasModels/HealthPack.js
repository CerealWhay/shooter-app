import {DynamicCircle} from "./DynamicCircle.js";

export class HealthPack extends DynamicCircle {

    radius = 30;

    constructor() {
        super();
        this.position = {
            x: this.canvas.getCanvasRect().width / 2,
            y: this.canvas.getCanvasRect().height / 2,
        }
    }

    draw() {
        this.ctx.fillStyle = 'rgb(255,0,213)'
        super.draw()
    }
}
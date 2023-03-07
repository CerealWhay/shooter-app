import {DynamicCircle} from "./DynamicCircle.js";

export class AmmoPack extends DynamicCircle {

    radius = 30;

    constructor() {
        super();
    }

    draw() {
        this.ctx.fillStyle = 'rgba(200,255,0,0.91)'
        super.draw()
    }
}
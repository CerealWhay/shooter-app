import {DynamicCircle} from "./DynamicCircle.js";

export class HealthPack extends DynamicCircle {

    radius = 30;

    constructor() {
        super();
    }

    draw() {
        this.ctx.fillStyle = 'rgb(255,0,213)'
        super.draw()
    }
}
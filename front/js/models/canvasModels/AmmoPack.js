import {DynamicCircle} from "./DynamicCircle.js";

export class AmmoPack extends DynamicCircle {

    radius = 30;

    constructor() {
        super();
    }

    draw() {
        this.ctx.fillStyle = 'rgba(0,255,4,0.2)'
        super.draw()

        const img = new Image();
        img.src = "images/ammo.png";
        this.ctx.drawImage(
            img,
            this.position.x - this.radius,
            this.position.y - this.radius,
            this.radius * 2,
            this.radius * 2,
        );
    }
}
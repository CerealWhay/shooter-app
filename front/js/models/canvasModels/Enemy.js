import {DynamicCircle} from "./DynamicCircle.js";

export class Enemy extends DynamicCircle {

    radius = 30;

    images = [
        "images/enemies/bems.png",
    ]

    constructor() {
        super();
        this.image = this.images[Math.floor(Math.random() * this.images.length)]
    }

    draw() {
        const img = new Image();
        img.src = this.image
        this.ctx.drawImage(
            img,
            this.position.x - this.radius,
            this.position.y - this.radius,
            this.radius * 2,
            this.radius * 2,
        );
    }
}
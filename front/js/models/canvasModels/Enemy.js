import {DynamicCircle} from "./DynamicCircle.js";

export class Enemy extends DynamicCircle {

    radius = 30;

    images = [
        "images/enemies/1.png",
        "images/enemies/2.png",
        "images/enemies/3.png",
        "images/enemies/4.png",
        "images/enemies/5.png",
        "images/enemies/6.png",
        "images/enemies/7.png",
        "images/enemies/8.png",
        "images/enemies/9.png",
        "images/enemies/10.png",
        "images/enemies/11.png",
        "images/enemies/12.png",
        "images/enemies/13.png",
        "images/enemies/14.png",
        "images/enemies/15.png",
        "images/enemies/16.png",
        "images/enemies/17.png",
        "images/enemies/18.png",
        "images/enemies/19.png",
        "images/enemies/20.png",
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
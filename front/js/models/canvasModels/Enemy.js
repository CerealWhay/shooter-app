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
        "images/enemies/21.png",
        "images/enemies/22.png",
        "images/enemies/23.png",
        "images/enemies/24.png",
        "images/enemies/25.png",
        "images/enemies/26.png",
        "images/enemies/27.png",
        "images/enemies/28.png",
        "images/enemies/29.png",
        "images/enemies/30.png",
        "images/enemies/31.png",
        "images/enemies/32.png",
        "images/enemies/33.png",
        "images/enemies/34.png",
        "images/enemies/35.png",
        "images/enemies/36.png",
        "images/enemies/37.png",
        "images/enemies/38.png",
        "images/enemies/39.png",
        "images/enemies/40.png",
        "images/enemies/41.png",
        "images/enemies/42.png",
        "images/enemies/43.png",
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
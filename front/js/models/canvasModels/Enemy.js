import {DynamicCircle} from "./DynamicCircle.js";

export class Enemy extends DynamicCircle {

    radius = 30;

    images = [
        "images/bitrix.png",
        "images/kuzya.png",
        "images/lays.png",
    ]

    constructor() {
        super();
        this.image = this.images[Math.floor(Math.random() * 3)]
    }

    draw() {
        this.ctx.fillStyle = 'rgb(0,111,248)'
        super.draw()

        // const img = new Image();
        // img.src = this.image
        // this.ctx.drawImage(
        //     img,
        //     this.position.x - this.radius,
        //     this.position.y - this.radius,
        //     this.radius*2,
        //     this.radius*2,
        // );
    }
}
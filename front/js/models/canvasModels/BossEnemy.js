import {Enemy} from "./Enemy.js";

export class BossEnemy extends Enemy {

    radius = 50;

    constructor() {
        super();
    }

    draw() {
        super.drawHPBar()

        const img = new Image();
        img.src = "images/boss-enemy.png";
        this.ctx.drawImage(
            img,
            this.position.x - this.radius,
            this.position.y - this.radius,
            this.radius * 2,
            this.radius * 2,
        );
    }
}
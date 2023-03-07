import {Enemy} from "./Enemy.js";

export class BossEnemy extends Enemy {

    radius = 50;

    constructor() {
        super();
    }

    draw() {
        super.draw()
        super.drawHPBar()
    }
}
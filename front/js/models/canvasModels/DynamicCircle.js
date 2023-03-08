import {CANVAS} from "../Canvas.js";

export class DynamicCircle {

    radius = 15;
    position = {
        x: 0,
        y: 0,
    }
    healthBarHeight = 10
    HPFactor = 1

    constructor() {
        this.canvas = CANVAS;
        this.ctx = this.canvas.getCtx();
    }

    getPosition() {
        return this.position
    }

    setPosition(position) {
        this.position = position
    }

    getRadius() {
        return this.radius;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(
            this.position.x,
            this.position.y,
            this.radius,
            0,
            Math.PI * 2,
            false
        );
        this.ctx.closePath();
        this.ctx.fill();
    }

    drawHPBar() {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(
            this.position.x - this.radius,
            this.position.y - this.radius - this.healthBarHeight * 2,
            this.radius*2,
            this.healthBarHeight,
        )

        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(
            this.position.x - this.radius + 2,
            this.position.y - this.radius - this.healthBarHeight * 2 + 2,
            (this.radius*2 - 4) * this.HPFactor,
            this.healthBarHeight - 4,
        )
    }

    setHPFactor(factor) {
        this.HPFactor = factor
    }
}
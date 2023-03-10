import {Enemy} from "../models/index.js";

export class EnemyController {

    constructor() {
        this.enemy = new Enemy();
        this.deltaPosition = {
            x: 0,
            y: 0,
        }
        this.setAcceleration()
    }

    getEnemy() {
        return this.enemy
    }

    setAcceleration(score = 0) {
        this.acceleration = (score / 1500) + 0.5
    }

    frame() {
        this.move()
        this.enemy.draw()
    }

    move() {
        this.enemy.getPosition().x += this.deltaPosition.x * this.acceleration;
        this.enemy.getPosition().y += this.deltaPosition.y * this.acceleration;
    }

    setCoordinates(playerPosition) {

        let position = {}
        if (Math.random() < 0.5) {
            if (Math.random() < 0.5) {
                position.x = -this.enemy.getRadius();
            } else {
                position.x = this.enemy.canvas.getCanvasRect().width + this.enemy.getRadius();
            }
            position.y = Math.random() * this.enemy.canvas.getCanvasRect().height;
        } else {
            position.x = Math.random() * this.enemy.canvas.getCanvasRect().width;
            if (Math.random() < 0.5) {
                position.y = -this.enemy.getRadius();
            } else {
                position.y = this.enemy.canvas.getCanvasRect().height + this.enemy.getRadius();
            }
        }
        this.enemy.setPosition(position)

        this.setDeltaPosition(playerPosition)
    }

    setDeltaPosition(playerPosition) {
        const angle = Math.atan2(
            playerPosition.y - this.enemy.getPosition().y,
            playerPosition.x - this.enemy.getPosition().x,
        )
        this.deltaPosition = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
    }

}
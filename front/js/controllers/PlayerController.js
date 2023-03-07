import {Player} from "../models/index.js";

export class PlayerController {
    controls = null;
    baseHP = 5
    healthPoints = this.baseHP

    baseAmmo = 50
    ammoCount = this.baseAmmo

    constructor() {
        this.player = new Player();
        this.controls = {
            isPlayerUp: false,
            isPlayerDown: false,
            isPlayerLeft: false,
            isPlayerRight: false,
        }
    }

    frame() {
        this.move();
        this.player.draw()
    }

    getPlayer() {
        return this.player
    }

    setControls(controls) {
        this.controls = controls
    }

    isHPfull() {
        return this.baseHP === this.healthPoints
    }

    getAmmoCount() {
        return this.ammoCount
    }

    setFullAmmo() {
        return this.ammoCount = this.baseAmmo
    }

    increasePlayerHP() {
        this.healthPoints++
        this.player.setHPFactor(this.healthPoints / this.baseHP)
        return this.healthPoints
    }

    decreasePlayerHP() {
        this.healthPoints--
        this.player.setHPFactor(this.healthPoints / this.baseHP)
        return this.healthPoints
    }

    decreaseAmmoCount() {
        this.ammoCount--
    }

    move() {
        const {
            isPlayerUp,
            isPlayerDown,
            isPlayerLeft,
            isPlayerRight,
        } = this.controls

        const newPosition = this.player.getPosition()

        if (
            isPlayerUp
            && newPosition.y > this.player.getRadius()
        ) {
            newPosition.y -= 5;
        }
        if (
            isPlayerDown
            && newPosition.y < this.player.canvas.getCanvasRect().height - this.player.getRadius()
        ) {
            newPosition.y += 5;
        }
        if (
            isPlayerLeft
            && newPosition.x > this.player.getRadius()
        ) {
            newPosition.x -= 5;
        }
        if (
            isPlayerRight
            && newPosition.x < this.player.canvas.getCanvasRect().width - this.player.getRadius()
        ) {
            newPosition.x += 5;
        }

        this.player.setPosition(newPosition);
    }
}
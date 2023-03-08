import {getCanvasMousePosition} from "../common/canvasMousePosition.js";
import {throttle} from "../common/throttle.js";
import {CANVAS} from "../models/Canvas.js";
import AudioController from "./AudioController.js";

export class ShootController {
    isShooting = false

    mousePos = {
        x: 0,
        y: 0,
    }

    constructor(projectilesController, playerController, aimController) {
        this.projectilesController = projectilesController
        this.playerController = playerController
        this.aimController = aimController

        this.throttledShoot = throttle(this.shoot.bind(this), 125)
    }

    frame() {
        this.changeAim()
        if (this.isShooting) this.throttledShoot()
    }

    shoot() {
        if (this.playerController.getAmmoCount() > 0) {
            AudioController.playShootSound()
            this.playerController.decreaseAmmoCount()
            const canvasMousePos = getCanvasMousePosition(CANVAS.getCanvasRect(), this.mousePos)
            this.projectilesController.addProjectile(
                canvasMousePos,
                this.playerController.getPlayer().getPosition()
            )
        } else {
            AudioController.playEmptyShootSound()
        }
    }

    changeAim() {
        this.aimController.setPlayerPos(this.playerController.getPlayer().getPosition())
        this.aimController.setMousePos(
            getCanvasMousePosition(CANVAS.getCanvasRect(), this.mousePos)
        );
    }

    setIsShooting(isShooting) {
        this.isShooting = isShooting
    }

    setMousePos(mousePos) {
        this.mousePos = mousePos
    }

}

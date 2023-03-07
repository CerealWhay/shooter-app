import {CANVAS} from "../../models/Canvas.js";
import {HealthPackController} from "./HealthPackController.js";
import {throttle} from "../../common/throttle.js";
import {AmmoPackController} from "./AmmoPackController.js";

export class LootController {
    loot = []

    constructor(playerController) {
        this.playerController = playerController
        this.throttledAddHealthPack = throttle(this.addHealthPack.bind(this), 5000)
        this.throttledAddAmmoPack = throttle(this.addAmmoPack.bind(this), 5000)
    }

    frame() {
        if (!this.playerController.isHPfull()) this.throttledAddHealthPack()
        this.throttledAddAmmoPack()

        this.loot.forEach(loot => {
            loot.frame();
        })
    }

    getHealthPacks() {
        return this.loot.filter(loot => loot instanceof HealthPackController)
    }

    addHealthPack() {
        const healthPack = new HealthPackController({
            x: Math.random() * CANVAS.getCanvasRect().width,
            y: Math.random() * CANVAS.getCanvasRect().height,
        })
        this.loot.push(healthPack)
    }

    getAmmoPacks() {
        return this.loot.filter(loot => loot instanceof AmmoPackController)
    }

    addAmmoPack() {
        const healthPack = new AmmoPackController({
            x: Math.random() * CANVAS.getCanvasRect().width,
            y: Math.random() * CANVAS.getCanvasRect().height,
        })
        this.loot.push(healthPack)
    }

    removeLoot(lootController) {
        this.loot = this.loot.filter(item => item !== lootController)
    }
}
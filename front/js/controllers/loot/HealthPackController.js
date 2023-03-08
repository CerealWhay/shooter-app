import {HealthPack} from "../../models/index.js";

export class HealthPackController {
    constructor(position) {
        this.model = new HealthPack();
        this.model.setPosition(position)
    }

    frame() {
        this.model.draw()
    }

    getModel() {
        return this.model
    }
}
import {AmmoPack} from "../../models/index.js";

export class AmmoPackController {
    constructor(position) {
        this.model = new AmmoPack();
        this.model.setPosition(position)
    }

    frame() {
        this.model.draw()
    }

    getModel() {
        return this.model
    }
}
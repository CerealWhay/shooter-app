import {EnemyController} from "./EnemyController.js";
import {BossEnemy} from "../models/index.js";

export class BossEnemyController extends EnemyController {

    isBoss = true;
    baseHP = 15
    healthPoints = this.baseHP
    constructor() {
        super();
        this.enemy = new BossEnemy();
    }

    getBossHP() {
        return this.healthPoints
    }

    setBossHP(hp) {
        this.healthPoints = hp
        this.enemy.setHPFactor(this.healthPoints / this.baseHP)
    }

    setAcceleration(score = 0) {
        this.acceleration = 0.5
    }
}
import {EnemyController} from "./EnemyController.js";
import {throttle} from "../common/throttle.js";
import {BossEnemyController} from "./BossEnemyController.js";


export class EnemiesController {

    enemies = [];

    isBossExist = false;

    constructor() {
        this.throttledAddEnemy = throttle(this.addEnemy, 750)
    }

    getEnemies() {
        return this.enemies
    }

    frame(playerPosition, score) {
        this.throttledAddEnemy(playerPosition, score)

        if (score !== 0
            && !this.isBossExist
            && score % 500 === 0)
        {
            this.addBoss(playerPosition);
            this.isBossExist = true
        }

        this.enemies.forEach(
            (enemyController) => {
                enemyController.setAcceleration(score)
                enemyController.setDeltaPosition(playerPosition)
                enemyController.frame()
            }
        )
    }

    addEnemy = (playerPosition) => {
        const enemyController = new EnemyController()
        enemyController.setCoordinates(playerPosition)
        this.enemies.push(enemyController)
    }

    addBoss = (playerPosition) => {
        const enemyController = new BossEnemyController()
        enemyController.setCoordinates(playerPosition)
        this.enemies.push(enemyController)
    }

    removeEnemy(enemyController) {
        this.enemies = this.enemies.filter(item => item !== enemyController)
    }

    setIsBossExist(isBossExist) {
        this.isBossExist = isBossExist
    }
}
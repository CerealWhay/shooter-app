import AudioController from "./AudioController.js";

export class CollisionController {

    playerInvulnerable = false

    constructor(controllers) {
        const {
            playerController,
            projectilesController,
            enemiesController,
        } = controllers
        this.projectilesController = projectilesController
        this.playerController = playerController
        this.enemiesController = enemiesController
    }

    frame() {
        const isDeath = this.playerEnemyCollision();
        const kills = this.ProjectileEnemyCollision();
        return {
            kills: kills,
            isDeath: isDeath
        };
    }

    playerEnemyCollision() {
        const enemies = this.enemiesController.getEnemies();
        let isDeath = false;

        enemies.forEach((enemyController) => {
            const dist = Math.hypot(
                this.playerController.getPlayer().getPosition().x - enemyController.getEnemy().getPosition().x,
                this.playerController.getPlayer().getPosition().y - enemyController.getEnemy().getPosition().y,
            )
            if (dist <= (enemyController.getEnemy().getRadius() + this.playerController.getPlayer().getRadius())) {
                if (!this.playerInvulnerable)
                    isDeath = this.playerTouchedEnemy()
            }
        })
        return isDeath;
    }

    playerTouchedEnemy() {
        const hp = this.playerController.decreasePlayerHP()
        this.playerInvulnerable = true
        setTimeout(() => this.playerInvulnerable = false, 500)
        return hp === 0;
    }

    ProjectileEnemyCollision() {
        const projectiles = this.projectilesController.getProjectiles();
        const enemies = this.enemiesController.getEnemies();

        let kills = 0;

        enemies.forEach((enemyController) => {
            projectiles.forEach((projectileController) => {
                const dist = Math.hypot(
                    projectileController.getProjectile().getPosition().x - enemyController.getEnemy().getPosition().x,
                    projectileController.getProjectile().getPosition().y - enemyController.getEnemy().getPosition().y,
                )
                if (dist <= enemyController.getEnemy().getRadius()) {
                    setTimeout(() => {
                        this.projectilesController.removeProjectile(projectileController)

                        if (enemyController.isBoss) {
                            const isDead = this.shootInBoss(enemyController)
                            if (!isDead) return kills
                        }
                        this.killEnemy(projectileController, enemyController);
                    }, 0)
                    kills++
                }
            })
        })
        return kills;
    }

    killEnemy(projectileController, enemyController) {
        AudioController.playKillSound()
        this.enemiesController.removeEnemy(enemyController)
    }

    shootInBoss(enemyController) {
        return enemyController.decreaseEnemyHP() === 0;
    }

}
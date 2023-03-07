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
                    isDeath = this.playerTouchedEnemy().isDead
            }
        })
        return isDeath;
    }

    playerTouchedEnemy() {
        let playerStat = {
            isDead: false,
            hp: this.playerController.getPlayerHP(),
        }
        if (playerStat.hp !== 1) {
            this.playerController.setPlayerHP(playerStat.hp - 1)
            this.playerInvulnerable = true
            setTimeout(() => this.playerInvulnerable = false, 500)
        } else {
            AudioController.playDeathSound()
            playerStat.isDead = true
        }
        return playerStat
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
                            const isDead = this.shootInBoss(enemyController).isDead
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
        let bossStat = {
            isDead: false,
            hp: enemyController.getBossHP(),
        }
        if (bossStat.hp !== 1) {
            enemyController.setBossHP(bossStat.hp - 1)
        } else {
            bossStat.isDead = true
            this.enemiesController.setIsBossExist(false)
        }
        return bossStat
    }

}
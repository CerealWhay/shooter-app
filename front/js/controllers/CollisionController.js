import AudioController from "./AudioController.js";

export class CollisionController {

    playerInvulnerable = false

    constructor(controllers) {
        const {
            playerController,
            projectilesController,
            enemiesController,
            lootController,
        } = controllers
        this.projectilesController = projectilesController
        this.playerController = playerController
        this.enemiesController = enemiesController
        this.lootController = lootController
    }

    frame() {
        const isDeath = this.playerEnemyCollision();
        const kills = this.ProjectileEnemyCollision();
        this.playerHealthPackCollision()
        this.playerAmmoPackCollision()

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
                if (!this.playerInvulnerable) isDeath = this.playerTouchedEnemy()
                if (isDeath) AudioController.playDeathSound()
            }
        })
        return isDeath;
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

    playerHealthPackCollision() {
        const healthPacks = this.lootController.getHealthPacks()
        healthPacks.forEach(healthPack => {
            const dist = Math.hypot(
                this.playerController.getPlayer().getPosition().x - healthPack.getModel().getPosition().x,
                this.playerController.getPlayer().getPosition().y - healthPack.getModel().getPosition().y,
            )
            if (dist <= (healthPack.getModel().getRadius() + this.playerController.getPlayer().getRadius())) {
                if (!this.playerController.isHPfull()) {
                    setTimeout(() => this.lootController.removeLoot(healthPack), 0);
                    this.playerController.increasePlayerHP()
                    AudioController.playHealthPickupSound()
                }
            }
        })
    }

    playerAmmoPackCollision() {
        const ammoPacks = this.lootController.getAmmoPacks()
        ammoPacks.forEach(ammoPack => {
            const dist = Math.hypot(
                this.playerController.getPlayer().getPosition().x - ammoPack.getModel().getPosition().x,
                this.playerController.getPlayer().getPosition().y - ammoPack.getModel().getPosition().y,
            )
            if (dist <= (ammoPack.getModel().getRadius() + this.playerController.getPlayer().getRadius())) {
                setTimeout(() => this.lootController.removeLoot(ammoPack), 0);
                this.playerController.setFullAmmo()
                AudioController.playAmmoPickupSound()
            }
        })
    }


    // service funcs
    playerTouchedEnemy() {
        AudioController.playDamageSound()
        const hp = this.playerController.decreasePlayerHP()
        this.playerInvulnerable = true
        setTimeout(() => this.playerInvulnerable = false, 500)
        return hp === 0;
    }

    killEnemy(projectileController, enemyController) {
        AudioController.playKillSound()
        this.enemiesController.removeEnemy(enemyController)
    }

    shootInBoss(enemyController) {
        AudioController.playEnemyHitSound()
        const hp = enemyController.decreaseEnemyHP()
        if (hp === 0) this.enemiesController.setIsBossExist(false)
        return hp === 0;
    }

}
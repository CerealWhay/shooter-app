class AudioController {

    constructor() {
        this.deathSound = new Audio("audio/death.mp3");
        this.shootSound = new Audio("audio/shoot.wav");
        this.killSound = new Audio("audio/quack.mp3");
        this.damageSound = new Audio("audio/player-damage.wav");
        this.enemyHitSound = new Audio("audio/enemy-hit.wav");
        this.emptyShootSound = new Audio("audio/empty-shoot.wav");
        this.healthPickupSound = new Audio("audio/health-pickup.wav");
        this.ammoPickupSound = new Audio("audio/ammo-pickup.wav");
    }

    playDeathSound() {
        this.deathSound.play()
    }

    playShootSound() {
        this.shootSound.play()
    }

    playKillSound() {
        this.killSound.play()
    }

    playDamageSound() {
        this.damageSound.play()
    }

    playEnemyHitSound() {
        this.enemyHitSound.play()
    }

    playEmptyShootSound() {
        this.emptyShootSound.play()
    }

    playHealthPickupSound() {
        this.healthPickupSound.play()
    }

    playAmmoPickupSound() {
        this.ammoPickupSound.play()
    }
}

export default new AudioController()
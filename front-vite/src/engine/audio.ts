class AudioSystem {
  private deathSound: HTMLAudioElement;
  private shootSound: HTMLAudioElement;
  private killSound: HTMLAudioElement;
  private damageSound: HTMLAudioElement;
  private enemyHitSound: HTMLAudioElement;
  private emptyShootSound: HTMLAudioElement;
  private healthPickupSound: HTMLAudioElement;
  private ammoPickupSound: HTMLAudioElement;

  constructor() {
    this.deathSound = new Audio('audio/death.mp3');
    this.shootSound = new Audio('audio/shoot.wav');
    this.killSound = new Audio('audio/kill.wav');
    this.damageSound = new Audio('audio/player-damage.wav');
    this.enemyHitSound = new Audio('audio/enemy-hit.wav');
    this.emptyShootSound = new Audio('audio/empty-shoot.wav');
    this.healthPickupSound = new Audio('audio/health-pickup.wav');
    this.ammoPickupSound = new Audio('audio/ammo-pickup.wav');
  }

  playDeath() {
    this.deathSound.play();
  }

  playShoot() {
    this.shootSound.play();
  }

  playKill() {
    this.killSound.play();
  }

  playDamage() {
    this.damageSound.play();
  }

  playEnemyHit() {
    this.enemyHitSound.play();
  }

  playEmptyShoot() {
    this.emptyShootSound.play();
  }

  playHealthPickup() {
    this.healthPickupSound.play();
  }

  playAmmoPickup() {
    this.ammoPickupSound.play();
  }
}

export const audioSystem = new AudioSystem();

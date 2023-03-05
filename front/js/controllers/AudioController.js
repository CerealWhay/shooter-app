class AudioController {

    constructor() {
        this.deathSound = new Audio("audio/death.mp3");
        this.shootSound = new Audio("audio/shoot.wav");
        this.killSound = new Audio("audio/kill.wav");
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
}

export default new AudioController()
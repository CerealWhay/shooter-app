import {CANVAS} from "../models/Canvas.js";
import {
    PlayerController,
    AimController,
    ProjectilesController,
    EnemiesController,

    KeyboardController,
    ShootController,
    CollisionController,
} from "../controllers/index.js"
import {MainMenu} from "./mainMenu.js";
import {Overlay} from "./overlay.js";
import {ScoreTable} from "./scoreTable.js";

/* @todo:
     сделать полоску хп, чтобы не от одгного вражины дохнуть + хилки на карте можно докинуть
     сделать лимит на патроны, и их появление на канвасе
     сделать босса на каждые 500 очков (он будет умирать от большего кол-ва выстрелов + фикса скорость(наверное 1x))

     сделать несколько видов оружия
     система улучшений (лвла, улучшеные шмотки, плюсы к хп, скорости)
     сделать милишное оружие
*/

export const app = Vue.createApp({
    components: {
        KeyboardController,
        MainMenu,
        Overlay,
        ScoreTable,
    },
    data() {
        return {
            animation: null,

            canvasInstance: null,
            ctx: null,
            canvasRect: null,

            playerController: null,
            aimController: null,
            projectilesController: null,
            enemiesController: null,
            collisionController: null,
            shootController: null,

            pause: false,
            isNewGame: true,
            score: null,

            username: '',
            records: []
        }
    },
    mounted() {
        this.getRecords()
    },
    watch: {
        isNewGame(b) {
            if (b) {
                window.cancelAnimationFrame(this.animation)
            }
        }
    },
    methods: {
        init(username) {
            this.username = username
            this.score = 0;
            this.isNewGame = false;

            this.createCanvas();
            this.playerController = new PlayerController();
            this.aimController = new AimController();
            this.projectilesController = new ProjectilesController();
            this.enemiesController = new EnemiesController();
            this.collisionController = new CollisionController();

            this.shootController = new ShootController(
                this.projectilesController,
                this.playerController,
                this.aimController,
            )

            this.animation = window.requestAnimationFrame(this.animateCanvas)
        },
        createCanvas() {
            this.canvasInstance = CANVAS
            this.canvasInstance.setCanvasNode(this.$refs.canvas)
            this.ctx = this.canvasInstance.getCtx();
            this.canvasRect = this.canvasInstance.getCanvasRect();
        },
        animateCanvas() {
            if (!this.pause) {
                // clear rect
                this.ctx.clearRect(0, 0,this.canvasRect.width, this.canvasRect.height);

                // shoot events
                this.shootController.frame()

                // draw projectiles
                this.projectilesController.frame();

                // draw player
                this.playerController.frame()

                // draw aim
                this.aimController.frame()

                // draw enemies
                this.enemiesController.frame(
                    this.playerController.getPlayer().getPosition(),
                    this.score
                )

                const collision = this.collisionController.frame({
                    playerController: this.playerController,
                    projectilesController: this.projectilesController,
                    enemiesController: this.enemiesController,
                });
                if (collision.isDeath) {
                    this.death();
                }
                if (collision.kills) {
                    this.score += collision.kills * 10;
                }
            }
            this.animation = window.requestAnimationFrame(this.animateCanvas)
        },

        mouseDown() {
            this.shootController.setIsShooting(true)
        },
        mouseUp() {
            this.shootController.setIsShooting(false)
        },
        mouseMove(e) {
            this.shootController.setMousePos({x: e.clientX, y: e.clientY})
        },
        changeControls(e) {
            this.playerController.setControls(e)
        },

        death() {
            console.log('loser!!!');
            this.isNewGame = true;
            this.sendRecord();
        },

        getRecords() {
            axios
                .get('/get-records')
                .then(response => {
                    if (response.status === 200) this.records = response.data
                });
        },

        sendRecord() {
            axios
                .post('/add-record', {
                    username: this.username,
                    score: this.score
                })
                .then(() => this.getRecords());
        }
    },
    // language=Vue
    template: `

      <div class="container">

      <div class="play-zone">
        <MainMenu
            v-show="pause || isNewGame"
            :is-new-game="isNewGame"
            :score="score"
            @start="init"
            @resume="pause = false"
        ></MainMenu>

        <Overlay
            v-show="!pause && !isNewGame"
            :score="score"
        ></Overlay>

        <canvas
            ref="canvas"
            @mousedown="mouseDown"
            @mouseup="mouseUp"
            @mousemove="mouseMove"
        ></canvas>
      </div>

      <ScoreTable :records="records"></ScoreTable>


      <KeyboardController
          v-if="ctx"
          @changeControls="changeControls"
          @pause="pause = !pause"
      ></KeyboardController>
      </div>

    `
})
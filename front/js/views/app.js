import {CANVAS} from "../models/Canvas.js";
import {
    PlayerController,
    AimController,
    ProjectilesController,
    EnemiesController,

    KeyboardController,
    CollisionController,
} from "../controllers/index.js"
import {getCanvasMousePosition} from "../common/canvasMousePosition.js";
import {MainMenu} from "./mainMenu.js";
import {Overlay} from "./overlay.js";
import {ScoreTable} from "./scoreTable.js";

/* @todo:
     сделать полоску хп, чтобы не от одгного вражины дохнуть + хилки на карте можно докинуть
     сделать лимит на патроны, и их появление на канвасе

     сделать несколько видов оружия
     сделалть врагов-боссов (кторые не умирают от одного выстрела)
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

        shoot(e) {
            const canvasMousePos = getCanvasMousePosition(this.canvasRect, {x: e.clientX, y: e.clientY})
            this.projectilesController.addProjectile(
                canvasMousePos,
                this.playerController.getPlayer().getPosition()
            )
        },
        changeAim(e) {
            this.aimController.setPlayerPos(this.playerController.getPlayer().getPosition())
            this.aimController.setMousePos(
                getCanvasMousePosition(this.canvasRect, {x: e.clientX, y: e.clientY})
            );
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
            @mousedown="shoot($event)"
            @mousemove="changeAim"
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
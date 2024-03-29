export const MainMenu =  {
    props: {
        isNewGame: {
            type: Boolean,
            required: false,
        },
        score: {
            type: Number,
            required: false,
        },
    },
    data() {
        return {
            username: '',
            usernameError: false,
        }
    },
    methods: {
        startNewGame() {
            if (this.username) {
                this.$emit('start', this.username);
            } else {
                this.usernameError = true;
            }
        }

    },
    // language=Vue
    template: `

      <div class="main-menu">
      <div class="menu-wrapper">

        <div class="score">
          Your score:
          <span class="score-num">
            {{ score || 0 }}
          </span>
        </div>

        <div
            v-if="isNewGame"
            class="username"
            :class="{'error': usernameError}"
        >
          <div class="username__desc">Игра по мотивам печальной повести о том как БЕМС вышел из уток в минуса...</div>
          <div class="username__label">Please enter username</div>
          <input id="username__input" 
                 class="username__input"
                 type="text"
                 placeholder="Enter username" 
                 v-model="username" 
          />
        </div>
        <div
            v-if="isNewGame"
            class="btn btn--start"
            @click="startNewGame"
        >
          Start new Game
        </div>

        <div
            v-if="!isNewGame"
            class="btn btn--resume"
            @click="$emit('resume');"
        >
          Resume game
        </div>

      </div>
      </div>

    `
}
export const Overlay = {
    props: {
        score: {
            type: Number,
            required: true,
        },
        ammoCount: {
            type: Number,
            required: true,
        }
    },
    // language=Vue
    template: `

      <div class="overlay">
      <div class="score-ui">
        <div>
          Your score:
          <span class="score-num">
            {{ score }}
          </span>
        </div>
        <div>
          Your ammo count:
          <span class="score-num">
            {{ ammoCount }}
          </span>
        </div>
      </div>

      <div class="warning-info">
        controls :
        <span class="warninig-info__message">WASD - movement</span>
        <span class="warninig-info__message">LEFT CLICK - shoot</span>
        <span class="warninig-info__message">ESC - pause</span>
      </div>
      </div>

    `
}
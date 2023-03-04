export const ScoreTable = {
    props: {
        records: {
            type: Array,
            required: false,
        },
    },
    computed: {
        scoreItems() {
            let scoreItems = []

            this.records.forEach(score => {
                scoreItems.push(this.formatDate(score))
            })
            return scoreItems
        }
    },
    methods: {
        formatDate(score) {
            const dateSamp = new Date(score.created)
            const year = dateSamp.getFullYear()
            const month = dateSamp.getMonth() + 1
            const day = dateSamp.getDate()
            const hour = dateSamp.getHours()
            const minute = dateSamp.getMinutes()
            const second = dateSamp.getSeconds()

            score.created = `${day}\/${month}\/${year} ${hour}:${minute}:${second}`

            return score
        }
    },
    // language=Vue
    template: `

      <div class="score-table">
      <div class="score-table__title">SCORE TABLE</div>
      <div v-if="records" class="score-table__wrapper">

        <div v-for="scoreItem in scoreItems"
             :key="scoreItem.id"
             class="score-table__item score-item"
        >
          <div class="score-item__info">
            <div class="score-item__username" :title="scoreItem.username">
              {{ scoreItem.username }}
            </div>
            <div class="score-item__datetime">
              {{ scoreItem.created }}
            </div>
          </div>
          <div class="score-item__score">
            {{ scoreItem.score }}
          </div>
        </div>

      </div>
      </div>

    `
}
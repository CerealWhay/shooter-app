<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{ isNewGame?: boolean; score?: number }>();
const emit = defineEmits<{
  (e: 'start', username: string): void;
  (e: 'resume'): void;
}>();

const username = ref('');
const usernameError = ref(false);

const startNewGame = () => {
  if (username.value) {
    emit('start', username.value);
  } else {
    usernameError.value = true;
  }
};
</script>

<template>
  <div class="main-menu">
    <div class="menu-wrapper">
      <div class="score">
        Your score:
        <span class="score-num">
          {{ props.score || 0 }}
        </span>
      </div>

      <div
        v-if="props.isNewGame"
        class="username"
        :class="{ error: usernameError }"
      >
        <div class="username__label">Please enter username</div>
        <input
          id="username__input"
          class="username__input"
          type="text"
          placeholder="Enter username"
          v-model="username"
        />
      </div>
      <div v-if="props.isNewGame" class="btn btn--start" @click="startNewGame">
        Start new Game
      </div>

      <div v-if="!props.isNewGame" class="btn btn--resume" @click="emit('resume')">
        Resume game
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-menu {
  background: rgba(227, 227, 227, 0.0);
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 15px;

  .menu-wrapper {
    max-width: 500px;
    margin: 150px auto 0;
    padding: 35px;
    background: white;
    border-radius: 5px;

    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.6);
    -webkit-box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.6);
    -moz-box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.6);

    .score {
      display: flex;
      justify-content: center;
      font-size: 22px;
      margin-bottom: 20px;

      .score-num {
      }
    }

    .username {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      margin-bottom: 25px;

      .username__label {
        font-size: 32px;
      }

      .username__input {
        width: 50%;
        font-size: 20px;
        border-radius: 10px;
        padding: 15px;
        text-align: center;
        outline: none;
        border: 2px solid rgba(0, 0, 0, 0.5);

        &:hover, &:focus {
          border: 2px solid black;
        }
      }

      &.error {
        .username__label {
          color: red;
        }

        .username__input {
          border: 4px solid red;
        }
      }
    }
  }
}

.btn {
  //border: 1px solid black;
  border-radius: 5px;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 42px;
  cursor: pointer;
  background: rgb(250, 250, 250);

  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.6);
  -webkit-box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.6);
  -moz-box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.6);

  &--start {
  }

  &--resume {
  }

  &:hover {
    background: rgb(240, 240, 240);
  }
}
</style>

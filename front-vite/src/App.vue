<script setup lang="ts">
import { onMounted, ref, shallowRef, watch } from 'vue';
import MainMenu from './components/MainMenu.vue';
import Overlay from './components/Overlay.vue';
import ScoreTable from './components/ScoreTable.vue';
import KeyboardController from './components/KeyboardController.vue';
import { api } from './services/api';
import type { Controls, ScoreRecord } from './types';
import { Engine } from './engine/engine';
import { GAME_CONFIG } from './engine/config';

const canvasRef = ref<HTMLCanvasElement | null>(null);
const engine = shallowRef<Engine | null>(null);

const pause = ref(false);
const isNewGame = ref(true);
const score = ref(0);
const ammoCount = ref<number>(GAME_CONFIG.player.maxAmmo);
const username = ref('');
const records = ref<ScoreRecord[]>([]);

const init = (name: string) => {
  if (!canvasRef.value) return;

  username.value = name;
  score.value = 0;
  ammoCount.value = GAME_CONFIG.player.maxAmmo;
  isNewGame.value = false;
  pause.value = false;

  engine.value?.stop();
  engine.value = new Engine({
    canvas: canvasRef.value,
    callbacks: {
      onScoreChange: (value: number) => (score.value = value),
      onAmmoChange: (value: number) => (ammoCount.value = value),
      onDeath: () => death(),
    },
  });
  engine.value.init();
};

const mouseDown = () => {
  engine.value?.setShooting(true);
};
const mouseUp = () => {
  engine.value?.setShooting(false);
};
const mouseMove = (e: MouseEvent) => {
  engine.value?.setMousePos({ x: e.clientX, y: e.clientY });
};
const changeControls = (e: Controls) => {
  engine.value?.setControls(e);
};

const death = () => {
  isNewGame.value = true;
  engine.value?.stop();
  sendRecord();
};

const getRecords = async () => {
  try {
    const response = await api.get<ScoreRecord[]>('/get-records');
    if (response.status === 200) records.value = response.data;
  } catch (error) {
    console.warn('Failed to load records', error);
  }
};

const sendRecord = async () => {
  try {
    await api.post('/add-record', {
      username: username.value,
      score: score.value,
    });
    await getRecords();
  } catch (error) {
    console.warn('Failed to send record', error);
  }
};

watch(pause, (value) => {
  if (value) {
    engine.value?.pause();
  } else {
    engine.value?.resume();
  }
});

onMounted(() => {
  getRecords();
});
</script>

<template>
  <div class="container">
    <div class="play-zone">
      <MainMenu
        v-show="pause || isNewGame"
        :is-new-game="isNewGame"
        :score="score"
        @start="init"
        @resume="pause = false"
      />

      <Overlay
        v-show="!pause && !isNewGame"
        :score="score"
        :ammo-count="ammoCount"
      />

      <canvas
        ref="canvasRef"
        @mousedown="mouseDown"
        @mouseup="mouseUp"
        @mousemove="mouseMove"
      ></canvas>
    </div>

    <ScoreTable :records="records" />

    <KeyboardController
      v-if="!isNewGame"
      @changeControls="changeControls"
      @pause="pause = !pause"
    />
  </div>
</template>

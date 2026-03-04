<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive } from 'vue';
import type { Controls } from '../types';

const emit = defineEmits<{
  (e: 'changeControls', controls: Controls): void;
  (e: 'pause'): void;
}>();

const controls = reactive<Controls>({
  isPlayerUp: false,
  isPlayerDown: false,
  isPlayerLeft: false,
  isPlayerRight: false,
});

const onKeydown = (e: KeyboardEvent) => {
  if (e.code === 'Escape') {
    emit('pause');
    return;
  }

  switch (e.code) {
    case 'KeyW':
      controls.isPlayerUp = true;
      break;
    case 'KeyS':
      controls.isPlayerDown = true;
      break;
    case 'KeyA':
      controls.isPlayerLeft = true;
      break;
    case 'KeyD':
      controls.isPlayerRight = true;
      break;
  }

  emit('changeControls', { ...controls });
};

const onKeyup = (e: KeyboardEvent) => {
  switch (e.code) {
    case 'KeyW':
      controls.isPlayerUp = false;
      break;
    case 'KeyS':
      controls.isPlayerDown = false;
      break;
    case 'KeyA':
      controls.isPlayerLeft = false;
      break;
    case 'KeyD':
      controls.isPlayerRight = false;
      break;
  }

  emit('changeControls', { ...controls });
};

onMounted(() => {
  window.addEventListener('keydown', onKeydown);
  window.addEventListener('keyup', onKeyup);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown);
  window.removeEventListener('keyup', onKeyup);
});
</script>

<script setup lang="ts">
import { computed } from 'vue';
import type { ScoreRecord } from '../types';

const props = defineProps<{ records?: ScoreRecord[] }>();

const formatDate = (created: string): string => {
  const dateSamp = new Date(created);
  const year = dateSamp.getFullYear();
  const month = dateSamp.getMonth() + 1;
  const day = dateSamp.getDate();
  const hour = dateSamp.getHours();
  const minute = dateSamp.getMinutes();
  const second = dateSamp.getSeconds();

  return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
};

const scoreItems = computed(() => {
  const items = props.records ?? [];
  return items.map((record) => ({
    ...record,
    created: formatDate(record.created),
  }));
});
</script>

<template>
  <div class="score-table">
    <div class="score-table__title">SCORE TABLE</div>
    <div v-if="props.records" class="score-table__wrapper">
      <div
        v-for="scoreItem in scoreItems"
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
</template>

<style scoped lang="scss">
.score-table {
  border-radius: 15px;
  background: black;
  color: white;
  height: calc(100vh - 30px);
  overflow: overlay;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: white;

    border: 5px solid transparent;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;

    background-clip: padding-box;

    &:hover {
      background: white;

      border: 4px solid transparent;
      border-top: 15px solid transparent;
      border-bottom: 15px solid transparent;

      background-clip: padding-box;

    }
  }


  .score-table__title {
    padding-top: 5px;
    padding-bottom: 5px;
    text-align: center;
    font-size: 32px;
    top: 0;
    position: sticky;
    background: black;
  }

  .score-table__wrapper {
    padding: 10px;

    display: flex;
    flex-direction: column;

    .score-table__item {
    }
  }
}

.score-item {
  display: grid;
  grid-template-columns: 1fr auto;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px solid white;
  padding: 5px;

  .score-item__info {
    .score-item__username {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;

      word-wrap: break-word;
      max-width: 300px;
    }

    .score-item__datetime {
      font-size: 13px;
    }
  }


  .score-item__score {
    font-size: 20px;
  }


}
</style>

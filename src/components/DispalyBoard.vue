
<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import CardGrid from './CardGrid.vue';

const store = useStore();
const sourceCards = computed(() => store.state.cards);
const players = computed(() => store.state.players);

</script>

<template>
  <div class="display-board">
    <div class="board-inner">
      <div class="section-title">
        <span>卡牌展示区</span>
      </div>
      <div class="source-cards">
        <CardGrid :cards="sourceCards" />
      </div>
      <div class="space-v"></div>
      <div class="section-title">
        <span>玩家卡牌展示区</span>
      </div>
      <div class="player-wrapper" v-for="player in players" :key="player.key">
        <div class="player-name">{{ player?.name??"" }}</div>
        <CardGrid :cards="player.cards" />
        <div style="height: 12px;"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.display-board {
  flex: 1;
  padding: 24px;
  overflow: auto;
}

.space-v{
  width: 0;
  height: 24px;
}

.board-inner {
  max-width: 1280px;
  margin: auto;
}

.section-title {
  text-align: center;
  line-height: 56px;
}
.player-name{
  margin-bottom: 4px;
}
</style>
<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const winner = computed(() => store.state.winner);

function startGame() {
  store.dispatch("startGame");
}

</script>

<template>
  <div class="control-container">
    <div class="control-btns">
      <button class="start-btn" @click="startGame">开始游戏</button>
    </div>
    <div class="game-result">
      <div class="result-title"><span>游戏结果</span></div>
      <div class="result-content">
        <span>游戏获胜者是: <span class="winner-name">{{ winner?.name ?? "" }}</span></span>
      </div>
    </div>

  </div>
</template>

<style scoped>
.control-container {
  width: 256px;
  border-left: solid 1px #f0f1f2;
}

.control-btns {
  padding: 16px;
  text-align: center;
}

.start-btn {
  padding: 8px 24px;
  background: #0016ff;
  color: white;
  line-height: 1;
  border-radius: 4px;
}

.game-result {
  border-top: solid 1px #f0f1f2;
  padding: 16px;
}

.result-title {
  font-size: large;
}
.result-content{
  margin-top: 8px;
}
.winner-name{
  color: #ffd700;
}

@media screen and (max-width: 768px) {
  .control-container{
    width: 100%;
    border-left: none;
    box-shadow: 0 -8px 16px #f0f1f2;
  }
  .result-title{
    display: none;
  }
}

</style>
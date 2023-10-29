<script setup>
const props = defineProps({
  cards: Array
})
</script>

<template>
  <div class="card-grid">
    <div class="card-item" v-for="card in props.cards" :key="card.num + card.suit">
      <span class="card-item-text">{{ `${card.num}${card.suit}` }}</span>
    </div>
  </div>
</template>

<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(13, 1fr);
  gap: 16px;
}

.card-item {
  position: relative;
  border: solid 1px #f0f1f2;
  padding-bottom: 120%;
  box-shadow: 8px 8px 16px #f3f1f2;
}

.card-item-text {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;

}

@media screen and (max-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media screen and (min-width: 769px) and (max-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(7, 1fr);
  }

}
</style>
<script setup>
import Header from './components/Header.vue';
import Control from './components/Control.vue';
import DispalyBoard from './components/DispalyBoard.vue';
</script>

<template>
  <div class="page-container">
      <Header></Header>
      <div class="main-container">
          <DispalyBoard/>
          <Control/>
      </div>
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.main-container {
  flex: 1;
  display: flex;
  overflow: hidden;
}
@media screen and (max-width: 768px) {
  .main-container{
    flex-direction: column;
  }
}
</style>

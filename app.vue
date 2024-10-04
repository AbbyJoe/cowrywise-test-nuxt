<template>
  <div id="app">
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
const windowSize = ref({
  width: 0,
  height: 0,
});

const handleResize = () => {
  windowSize.value.width = window.innerWidth;
  windowSize.value.height = window.innerHeight;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
  document.documentElement.style.height = '100%';
  document.body.style.height = '100%';
  document.body.style.margin = '0px';

  handleResize();
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style lang="scss" scoped>
  #app {
    height: 100%;
    width: 100%;
    max-width: 1800px;
    margin: 0 auto;
    font-family: 'Work Sans', sans-serif;
    background: var(--pageColor);
  }
</style>

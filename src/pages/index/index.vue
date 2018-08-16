<template>
  <div class="index-page">
    <mpvue-gesture-lock :containerWidth="600" :cycleRadius="70"></mpvue-gesture-lock>
  </div>
</template>

<script>
  import mpvueGestureLock from '@/components/mpvueGestureLock'

  export default {
    name: 'indexPage',
    components: {mpvueGestureLock}
  }
</script>

<style scoped>
  .index-page {
    height: 100vh;
    width: 100vw;
  }
</style>

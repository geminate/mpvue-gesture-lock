<template>
  <div class="index-page">
    <mpvue-gesture-lock :containerWidth="600" :cycleRadius="70" @end="onEnd" :password="password"></mpvue-gesture-lock>
    <div class="result">{{data}}</div>
    <div class="result">正确密码是：12369</div>
  </div>
</template>

<script>
  import mpvueGestureLock from '@/components/mpvueGestureLock';

  export default {
    name: 'indexPage',
    components: {mpvueGestureLock},
    data() {
      return {
        data: [],
        password: [1, 2, 3, 6, 9]
      }
    },
    methods: {
      onEnd(data) {
        this.data = data;
      }
    }
  }
</script>

<style lang="less" scoped>
  .index-page {
    box-sizing: border-box;
    padding-top: 1rem;
    height: 100vh;
    width: 100vw;

    .result {
      text-align: center;
    }
  }
</style>

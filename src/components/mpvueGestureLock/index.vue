<template>
  <div class="gesture-lock"
       :style="{width: containerWidth +'rpx', height:containerWidth +'rpx'}"
       @touchstart="onTouchStart"
       @touchmove="onTouchMove"
       @touchend="onTouchEnd"
  >
    <!-- 9 个圆 -->
    <div v-for="(item,i) in circleArray" :key="i" class="cycle" :class="{check:item.check}"
         :style="{left:item.style.left,top:item.style.top,width:item.style.width,height:item.style.width}">
    </div>

    <!-- 已激活锁之间的线段 -->
    <div v-for="(item,i) in lineArray" :key="i" class="line"
         :style="{left:item.activeLeft,top:item.activeTop,width:item.activeWidth,transform:'rotate('+item.activeRotate+')'}">
    </div>

    <!-- 最后一个激活的锁与当前位置之间的线段 -->
    <div class="line"
         :style="{left:activeLine.activeLeft,top:activeLine.activeTop,width:activeLine.activeWidth,transform:'rotate('+activeLine.activeRotate+')'}">
    </div>
  </div>
</template>

<script>
  import GestureLock from './gestureLock';

  export default {
    name: 'index',
    props: ['containerWidth', 'cycleRadius'],// 容器宽度 和 圆的半径 单位是 rpx
    data() {
      return {
        gestureLock: {},
        circleArray: [],
        activeLine: {},
        lineArray: [],
      }
    },
    methods: {
      onTouchStart(e) {
        this.gestureLock.onTouchStart(e);
        this.refesh();
      },

      onTouchMove(e) {
        this.gestureLock.onTouchMove(e);
        this.refesh();
      },

      onTouchEnd(e) {
        this.gestureLock.onTouchEnd(e);
        this.refesh();
      },
      refesh() {
        this.circleArray = this.gestureLock.getCycleArray();
        this.lineArray = this.gestureLock.getLineArray();
        this.activeLine = this.gestureLock.getActiveLine();
      }
    },
    mounted() {
      this.gestureLock = new GestureLock(this.containerWidth, this.cycleRadius);
      this.refesh();
    }
  }
</script>

<style lang="less" scoped>
  .gesture-lock {
    margin: 0 auto;
    position: relative;
    box-sizing: border-box;
    overflow: auto;
  }

  .cycle {
    box-sizing: border-box;
    position: absolute;
    border: 2px solid #66aaff;
    border-radius: 50%;

    &.check:after {
      content: "";
      display: block;
      position: absolute;
      width: 32%;
      height: 32%;
      border: 2px solid #66aaff;
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .line {
    height: 0;
    border-top: 2px solid #66aaff;
    position: absolute;
    transform-origin: left center;
  }
</style>

## 简介
> 微信小程序的手势解锁组件。基于Mpvue开发。

**组件使用 DOM 实现，非Canvas。原因是微信小程序的Canvas目前存在问题，网上其他使用Canvas实现手势解锁的组件在小程序中存在严重的卡顿问题**

## 截图

<p align="center"><img src="http://liuhuihao.com/wp-content/uploads/2018/08/gestureLock.gif" alt="d-tools"></p>

## 构建
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```

组件位于 src/components/mpvueGestureLock <br>

可自行参考样例进行修改

## 组件属性
- containerWidth 容器宽度 单位rpx
- cycleRadius    锁圆宽度 单位rpx

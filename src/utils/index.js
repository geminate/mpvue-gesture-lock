const pxToRpx = () => {
  return px * 750 / wx.getSystemInfoSync().windowWidth;
};

const rpxTopx = () => {
  return rpx / 750 * wx.getSystemInfoSync().windowWidth;
};

export {pxToRpx, rpxTopx}

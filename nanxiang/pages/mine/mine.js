// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasBindTel:true,
    "pp":"mine",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log(wx.getStorageSync("userInfo").avatarUrl)
    if (wx.getStorageSync("tel") == null || wx.getStorageSync("tel") == ""){
      console.log("手机号为空")
      this.setData({
        hasBindTel: false,
        avatarUrl: wx.getStorageSync("userInfo").avatarUrl,
        nickName: wx.getStorageSync("userInfo").nickName,
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '南祥花艺城',
      path: '/pages/main/main/',
      imgUrls: '.././image/logo.png',
      success: function (res) {
        console.log('成功', res)
      }
    }
  },
  
})
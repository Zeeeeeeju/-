// pages/main/main.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: "true",//是否显示面板指示点
    autoplay: "true",//是否自动切换
    interval: "5000",//自动切换时间间隔
    duration: "1000",//滑动动画时长
    
    imgUrls: [
      "../../image/logo.png",
      "../../image/hua.jpg",
      "../../image/水仙.jpg"
    ],

    swiperNav: {
      i: 0,
      x: 0,
      arr: [
        { v: 0, txt: "全部" },
        { v: 1, txt: "年花年桔" },
        { v: 2, txt: "室内植物" },
        { v: 3, txt: "室外植物" },
        { v: 4, txt: "艺术盆景" },
        { v: 5, txt: "大型树木" }
      ]
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    this.app = getApp();
    wx.request({
      url: 'https://www.zzeju.xyz/nanxiang/goods/getGoods/0',
      data:{
        type:0,
        page:1,
        size:6
      },
      success(res){
        // console.log(res.data)
        that.setData({
          flowerList: res.data.data.list,
          pageNum: res.data.data.pageNum,
          pages: res.data.data.pages,
        })
      }
    })
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
    this.app.show(this, 'slide_up1',  1)
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
    let that = this;
    console.log('--------下拉刷新-------' + this.data.swiperNav.i)
    if(this.data.pageNum < this.data.pages){
      wx.request({
        url: 'https://www.zzeju.xyz/nanxiang/goods/getGoods/' + that.data.swiperNav.i,
        data: {
          page: that.data.pageNum+1,
          size: 6
        },
        success: function (res) {
          that.setData({
            flowerList: that.data.flowerList.concat(res.data.data.list),
            pageNum: res.data.data.pageNum,
            pages: res.data.data.pages,
          })
        }
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '南祥花艺城',
      path: '/pages/main/main/',
      imgUrls:'.././image/logo.png',
      success: function (res) {
        console.log('成功', res)
      }
    }
  },
  swiperNav: function (e) {
    console.log(e);
    let that = this;
    /*获取可视窗口宽度*/
    let w = wx.getSystemInfoSync().windowWidth;
    let leng = this.data.swiperNav.arr.length;
    let i = e.target.dataset.i;
    let disX = (i - 2) * w / leng;
    if (i != this.data.swiperNav.i) {
      wx.request({
        url: 'https://www.zzeju.xyz/nanxiang/goods/getGoods/' + e.target.dataset.i,
        data:{
          page: 1,
          size: 10
        },
        success: function (res) {
          that.setData({
            'swiperNav.i': e.target.dataset.i,
            flowerList: res.data.data.list,
            pageNum: res.data.data.pageNum,
            pages: res.data.data.pages,
          })
        }
      })
    }
    this.setData({
      'swiperNav.x': disX
    })
  },
  goToBuy:function(e){
    let id = e.currentTarget.dataset.id
    // console.log(id)
    wx.navigateTo({
      url: '../goodsInfo/goodsInfo?id='+id,
    })
  }
})
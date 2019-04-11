// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showDialog: false,
    non:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    this.setData({
      headIcon:wx.getStorageSync("userInfo").avatarUrl,
      nickName: wx.getStorageSync("userInfo").nickName
    })
    wx.request({
      url: 'https://www.zzeju.xyz/nanxiang/order/xcx/getMyOrder',
      data:{
        id: wx.getStorageSync("openid")
      },
      success(res){
        console.log("order:"+res.data)
        that.setData({
          orderNum: res.data.data.list,
          pageNum: res.data.data.pageNum,
          pages: res.data.data.pages,
          orderDetailList:[]
        })
        if(res.data.data.length == 0){
          that.setData({
            non:true
          })
        }
        for(let i=0;i<res.data.data.list.length;i++){
          wx.request({
            url: 'https://www.zzeju.xyz/nanxiang/order/getOrderDetail',
            data: {
              orderId: res.data.data.list[i]
            },
            success(res) {
              console.log(res.data.data)
              let obj = {
                orderId: res.data.data[0].orderId,
                data:res.data.data
              }
              that.setData({
                orderDetailList: that.data.orderDetailList.concat(obj)
              })
            }
          })
        }
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
    let that = this;
    if (this.data.pageNum < this.data.pages) {
      wx.request({
        url: 'https://www.zzeju.xyz/nanxiang/order/xcx/getMyOrder',
        data: {
          page: that.data.pageNum + 1,
          id:wx.getStorageSync("openid")
        },
        success: function (res) {
          that.setData({
            orderNumList: that.data.orderNumList.concat(res.data.data.list),
            pageNum: res.data.data.pageNum,
            pages: res.data.data.pages,
          })
        }
      })
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  /**
  * 控制 pop 的打开关闭
  * 该方法作用有2:
  * 1：点击弹窗以外的位置可消失弹窗
  * 2：用到弹出或者关闭弹窗的业务逻辑时都可调用
  */
  toggleDialog() {
    this.setData({
      showDialog: !this.data.showDialog
    });
  },
  toOrderDetail:function(e){
    console.log("订单详情" + e.currentTarget.dataset.orderid)
    this.toggleDialog();
    let that = this;
    wx.request({
      url: 'https://www.zzeju.xyz/nanxiang/order/xcx/getOrderDetail',
      data:{
        orderId: e.currentTarget.dataset.orderid
      },
      success(res){
        that.setData({
          orderDetail:res.data.data
        })
      }
    })
  },
})
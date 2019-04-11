// pages/goodsInfo/goodsInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIphoneX:false,
    showModalStatus: false,//是否显示
    num:1,
    gg_id: 0,//规格ID
    gg_price: 0,//规格价格
    danjia:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        if (res.model == 'iPhone X') {
          console.log("iPhone X")
          that.setData({
            isIphoneX: true
          })
        }
      }
    })
    wx.request({
      url: 'https://www.zzeju.xyz/nanxiang/goods/getGoodDetail/' + options.id,
      data: {
      },
      success(res) {
        console.log(res.data)
        that.setData({
          flowerInfo:res.data.data,
          gg_price:res.data.data.price,
          danjia: res.data.data.price,
          goodsId: res.data.data.goodsId
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

  },
  filter: function (e) {
    //console.log(e);
    let self = this, id = e.currentTarget.dataset.id, txt = e.currentTarget.dataset.txt, price = e.currentTarget.dataset.price
    self.setData({
      gg_id: id,
      gg_price: price
    });
  },

  /* 点击减号 */
  bindMinus: function () {
    let num = this.data.num;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    let minusStatus = num <= 1 ? 'disabled' : 'normal';
    let nowPrice = this.data.danjia * num;
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus,
      gg_price: nowPrice
    });
  },
  /* 点击加号 */
  bindPlus: function () {
    let num = this.data.num;
    // 不作过多考虑自增1  
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    let minusStatus = num < 1 ? 'disabled' : 'normal';
    let nowPrice = this.data.danjia * num;
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus,
      gg_price: nowPrice
    });
  },
  addCart:function(e){
    let that = this;
    let cart = wx.getStorageSync("cart");
    if(cart == null || cart == ""){
      let shopcart = [];
      let obj = {
        id:that.data.goodsId,
        num: that.data.num,
        title: that.data.flowerInfo.title,
        pro_name: that.data.flowerInfo.size,
        selected: true,
        image: "https://www.zzeju.xyz" +that.data.flowerInfo.picUrl,
        price: that.data.flowerInfo.price
      }
      shopcart.push(obj);
      wx.setStorageSync("cart", shopcart);
    } else {
      let obj = {
        id: that.data.goodsId,
        num: that.data.num,
        title: that.data.flowerInfo.title,
        pro_name: that.data.flowerInfo.size,
        selected: true,
        image: "https://www.zzeju.xyz"+that.data.flowerInfo.picUrl,
        price: that.data.flowerInfo.price
      }
      cart.push(obj);
      wx.setStorageSync("cart", cart);
    }
    wx.showToast({
      title: '成功加入购物车',
      icon: 'success',
      duration: 2000,
      complete:function(){
        that.hideModal();
      }
    })
  },

  //显示对话框
  showModal: function () {
    // 显示遮罩层
    let animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    let animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
})
//var li=[];
var index = 0;

Page({
  data:{
    list: wx.getStorageSync("addressList"),
    addreRange: ['　　　　　　　　　　', '珠海市香洲区', '珠海市金湾区', '珠海市斗门区'],
    pp:"choose"
},
addAddre:function(e){
  	wx.navigateTo({
       url: '../newAddre/newAddre'
    })
  },
toModifyAddre:function(e){
  wx.navigateTo({
    url: '../modifyAddre/modifyAddre?name=' + e.currentTarget.dataset.name + "&tel=" + e.currentTarget.dataset.tel + "&addre=" + e.currentTarget.dataset.addre + "&door=" + e.currentTarget.dataset.door
      + "&index=" + e.currentTarget.dataset.index});
  },
choose:function(e){
  let that = this;
  let pages = getCurrentPages();
  let prevPage = pages[pages.length - 2];
  let info = prevPage.data.pp
  // console.log("选择后："+info)
  if(info == "mine"){
    
  }else{
    wx.redirectTo({
      url: '../submitOrder/submitOrder?name=' + e.currentTarget.dataset.name + "&tel=" + e.currentTarget.dataset.tel + "&area=" + e.currentTarget.dataset.area + "&addre=" + e.currentTarget.dataset.addre + "&door=" + e.currentTarget.dataset.door + "&flag=" + true + "&data=" + JSON.stringify(that.data.goodsList) + "&total=" + this.data.totalPrice + "&index=" + JSON.stringify(that.data.indexs)
    });

    console.log("姓名为：" + e.currentTarget.dataset.name + "，手机是：" + e.currentTarget.dataset.tel + "，地址是：" + e.currentTarget.dataset.addre + "，详细地址是：" + e.currentTarget.dataset.door); 
  }

},

  onShow: function(options) {
    // let goods = JSON.parse(options.data);
    this.setData({
      list: wx.getStorageSync("addressList"),
    })
  },
  onLoad: function (options){
    let goods = JSON.parse(options.data);
    let indexs = JSON.parse(options.index);
    this.setData({
      goodsList: goods,
      totalPrice:options.total,
      indexs:indexs
    })
  }
})
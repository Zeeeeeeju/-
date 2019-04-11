var flag = false;
Page({
  data:{
    name:"",
    tel:"",
    addre:"",
    door:"",
    display1:"flex",
    display2:"none",
    addreRange: ['　　　　　　　　　　', '珠海市香洲区', '珠海市金湾区', '珠海市斗门区'],
    comment:""
  },

   onLoad: function(options) { 
      flag=options.flag;
     let goods = JSON.parse(options.data);
     let index = JSON.parse(options.index)
     console.log(options.name)
    if(!flag){
      this.setData({
          display1:"flex",
          display2:"none",
        })
    }else{
       this.setData({
          display1:"none",
          display2:"flex",
          name:options.name,
          tel:options.tel,
          area:options.area,
          areavalue:options.areavalue,
          addre:options.addre,
          door:options.door
       })
    }
    this.setData({
      goodsList:goods,
      totalPrice: options.total,
      indexs:index
    })
  },

  toChooseAddre:function(){
    let that = this;
    wx.redirectTo({
      url: '../chooseAddre/chooseAddre?data=' + JSON.stringify(that.data.goodsList) + "&total=" + that.data.totalPrice + "&index=" + JSON.stringify(that.data.indexs)
    });
  },

  //购买
  formSubmit: function(e) {
    let warn = "";//弹框时提示的内容
    let flag = true;//判断信息输入是否完整
    let that = this;
    //判断的顺序依次是：姓名-手机号-地址-具体地址-预约日期-预约时间-开荒面积
    if(this.data.name==""){
       warn="请输入您的地址信息";
    }else{
      flag = false;
      console.log('form发生了submit事件，携带数据为：', e.detail.value); 
      let sub = [];
      for (let i = 0; i < that.data.goodsList.length;i++){
        let obj = {
          goodsId:that.data.goodsList[i].id,
          num: that.data.goodsList[i].num,
          size: that.data.goodsList[i].pro_name
        }
        sub.push(obj);
      }
      wx.request({
        url: 'https://www.zzeju.xyz/nanxiang/order/submit?tel=' + that.data.tel + "&address=" + that.data.addreRange[that.data.addre] + that.data.door + "&name=" + that.data.name + "&totalPrice=" + that.data.totalPrice + "&id=" + wx.getStorageSync("openid"),
        method: "POST",
        header:{
          "Content-Type": "application/json; charset=UTF-8"
        },
        data:sub,
        success(res){
          console.log(res.data)
          wx.showModal({
          title: '提示',
            content: res.data.data,
          success: function (sm) {
            let cart = wx.getStorageSync("cart");
            console.log("sub" + that.data.indexs)
            for(let i=0;i<that.data.indexs.length;i++){
              cart.splice(that.data.indexs[i],1);
            }
            wx.setStorageSync("cart",cart);
            if (sm.confirm) {
              wx.reLaunch({
                url: '/pages/main/main',
              });
            } else if (sm.cancel) {
              wx.reLaunch({
                url: '/pages/main/main',
              });
            }
          }
        })
        }
      })

      // wx.showModal({
      //   title: '提示',
      //   content: "下单成功，请保持手机开机，随后会有客服与您联系！",
      //   success: function (sm) {
      //     if (sm.confirm) {
      //       wx.reLaunch({
      //         url: '/pages/main/main',
      //       });
      //     } else if (sm.cancel) {
      //       wx.reLaunch({
      //         url: '/pages/main/main',
      //       });
      //     }
      //   }
      // })
    }
   //如果信息填写不完整，弹出输入框
    if(flag==true){
      wx.showModal({
      title: '提示',
      content:warn
    })
  }


  }
})
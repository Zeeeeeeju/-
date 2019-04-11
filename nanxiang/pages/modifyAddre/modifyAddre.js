var flag=false;
Page({
  data:{
    name:"请填写您的姓名",
    tel:"请填写您的联系方式",
    addreValue:0,
    addreRange: ['　　　　　　　　　　', '珠海市香洲区', '珠海市金湾区', '珠海市斗门区'],
    door:"街道门牌信息",
    areaValue:0,
    areaRange:['　　','60以下','60-90','90-110','110-130','130-140','140-150','150-160','160-170','170-180','180以上'],
    index:"0"
  },
   onLoad: function(options) {
    this.setData({
    name:options.name,
    tel:options.tel,
    addreValue:options.addre,
    door:options.door,
    index:options.index
    })
    // console.log("传过来的index"+options.index);
    // console.log("接收到的index"+this.data.index);

   },
 
    addrePickerBindchange:function(e){
    this.setData({
      addreValue:e.detail.value
    })
  },
  //点击删除
    delete:function(){
      let that = this;
      wx.showModal({
       title: '提示',
       content: '确认删除该地址信息吗？',
       success: function(res) {
         if (res.confirm) {
           console.log('用户点击确定')
           let addressLists = wx.getStorageSync("addressList");
           addressLists.splice(that.data.index,1);
           wx.setStorageSync("addressList", addressLists);
           wx.navigateBack({
             delta: 1
           }) 
         } else if (res.cancel) {
           console.log('用户点击取消')
      }
    }
})

    },
//点击取消，返回上个页面
    cancel:function(){
      wx.navigateBack({
         delta: 1
      })
    },
    //点击保存
  formSubmit: function(e) {
    let warn ="";
    let that = this;
    if(e.detail.value.name==""){
      warn = "请填写您的姓名！";
    }else if(e.detail.value.tel==""){
      warn = "请填写您的手机号！";
    }else if(!(/^1(3|4|5|7|8)\d{9}$/.test(e.detail.value.tel))){
      warn = "手机号格式不正确";
    }else if(e.detail.value.addre=='0'){
      warn = "请选择您的所在区域";
    }else if(e.detail.value.door==""){
      warn = "请输入您的具体地址";
    }else{
      flag=true;
      // console.log('form发生了submit事件，携带数据为：', e.detail.value)
      // console.log("form:"+this.data.index)
      let addressLists = wx.getStorageSync("addressList");
      console.log("be:" + addressLists[this.data.index].name)
      addressLists[this.data.index].name = e.detail.value.name;
      addressLists[this.data.index].tel = e.detail.value.tel;
      addressLists[this.data.index].addre = e.detail.value.addre;
      addressLists[this.data.index].door = e.detail.value.door;
      // addressLists[this.data.index] = address;
      console.log("da:" + addressLists[this.data.index].name)
      wx.setStorageSync("addressList", addressLists);
      wx.navigateBack({
        delta: 1
      }) 
    }
    if(flag==false){
      wx.showModal({
      title: '提示',
      content:warn
    })
    }
    
  },
  
  })
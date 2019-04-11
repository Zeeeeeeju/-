var index = 0;
Page({
  data:{
    name:"请填写您的姓名",
    tel:"请填写您的联系方式",
    addreValue:0,
    addreRange: ['　　　　　　　　　　', '珠海市香洲区', '珠海市金湾区','珠海市斗门区'],
    door:"街道门牌信息",
    areaValue:0,
    areaRange:['　　','60以下','60-90','90-110','110-130','130-140','140-150','150-160','160-170','170-180','180以上']
  },
    
    addrePickerBindchange:function(e){
    this.setData({
      addreValue:e.detail.value
    })
  },
  formSubmit: function(e) {
    let warn ="";
    let that = this;
    let flag = false;
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
        
      let addressList = wx.getStorageSync("addressList")
      if (addressList == null || addressList == ""){
        console.log("无地址")
        let addressLists = [];
        let address = {
          name: e.detail.value.name,
          tel: e.detail.value.tel,
          addre: e.detail.value.addre,
          door: e.detail.value.door
        }
        addressLists.push(address);
        wx.setStorageSync("addressList", addressLists);
      }else{
        let address = {
          name: e.detail.value.name,
          tel: e.detail.value.tel,
          addre: e.detail.value.addre,
          door: e.detail.value.door
        }
        addressList.push(address);
        wx.setStorageSync("addressList", addressList);
      }
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
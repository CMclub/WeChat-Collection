
App({


  onLaunch: function(){

    //获取用户openid和token
    wx.login({
      success(res) {
        if (res.code) {
          //获取用户openid
          wx.request({
            url: 'https://www.shoolos.cn/api/user/',
            timeout:3000,
            data: {
              code: res.code
            },
            header: {
              'content-type': 'application/json',
            },
            success(res) {
              var obj = JSON.parse(res.data.openid)
              app.globalData.openid = obj.openid  //设置openid , 全局变量
              app.globalData.token = res.data.token  //设置token , 全局变量
              console.log('openid:  '+app.globalData.openid)
              console.log('token:   '+app.globalData.token)
            }
          })
        }
      }
    })

    this.globalData = {
      openid:'',      //用户openid ， 唯一识别码
      token:''       //身份确认码
      }

    }

})
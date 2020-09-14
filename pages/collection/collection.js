
// 获取全局应用程序实例对象
const app = getApp();

// 创建页面实例对象
Page({

  /**
   * 页面的初始数据
   */

  data: {
  
    infoList:[],
    id:'',
    like:'',
    liked:false,
    QR:false,

  
  },

  //获取页面所需的数据
  getCollection(){
    let _this = this
    //获取id
    try {
      const value = wx.getStorageSync('temp')
      _this.setData({
        id: value.id,
        like: value.like,
        liked: value.liked
      })
      console.log(value)
      wx.request({
        url: 'https://www.shoolos.cn/api/collection/',
        method:'GET',
        data:{
          id: value.id
        },
        success(res){
          console.log(res)
          res.data.code[0].num0 = 'https://dlpic.shoolos.cn/api/' + res.data.code[0].num0
          res.data.code[0].num10 = 'https://dlpic.shoolos.cn/api/' + res.data.code[0].num10
          for(let i=0; i<res.data.code[0].url.length; i++){
            res.data.code[0].url[i] = 'https://dlpic.shoolos.cn/api/' + res.data.code[0].url[i]
          }
          _this.setData({
            infoList:res.data.code[0]
          })
          console.log(_this.data.infoList)
        },
        fail(res){
          console.log(res)
        }
      })
    }catch (e) {
      // Do something when catch error
      console.log(e)
    }
  },


  like(){
    let _this = this
    //确定用户操作
    var num = 1
    //用户取消收藏
    if(_this.data.liked){
      num = 0
      _this.setData({
        liked:!_this.data.liked,
        like:_this.data.like-1
      })
    }else{
      _this.setData({
        liked:!_this.data.liked,
        like:_this.data.like+1
      })
    }
    wx.request({
      url: 'https://www.shoolos.cn/api/like/',
      data:{
        open_id: app.globalData.openid,
        id:_this.data.id,
        status:num,
      },
      success(res){
        console.log(res)
      },
    })
  },

  setQR(){
    this.setData({
      QR:true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    this.getCollection()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    
  },


  //以下为自定义点击事件
  
  tap_de01fdb6:function(e){
    //触发coolsite360交互事件
    app.coolsite360.fireEvent(e,this);
  },
  
})


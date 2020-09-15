// pages/search/search.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
	keyword:'',
	list:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  
  
  //获取输入内容
  getKeyword(e){
  	this.setData({keyword: e.detail.value})
      console.log('keyword:  ' + this.data.keyword)
  },
  
  //搜索接口
  search(){
  	let _this = this;
   	wx.request({
        url: 'https://www.shoolos.cn/api/search/',
        method:'GET',
        data:{
          keyword: _this.data.keyword,
        },
        success(res){
          console.log(res)
          // for(var i=0; i<res.data.code.length; i++){
          //   _this.setData({
          //     list:
          //   })
          // }
          _this.setData({
            list:res.data.code
          })
          console.log(_this.data.list)
        },
        fail(res){
          console.log(res)
        }
    })
  },

  //跳转到详情页
  toInfo(e){
    var temp = e.currentTarget.dataset.item;
    console.log(temp)
    try {
      wx.setStorageSync('temp', temp)
    } catch (e) {console.log(e) }
    //********************** 
    //这里要修改为navigateTo
    wx.switchTab({
      url:'../collection/collection'
    })
  },
})

// 获取全局应用程序实例对象
const app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */

  data: {
    item:0,
    id:'',
    name:'',
    msg:'',
    view:'',
    like:'',


    infoList:[],
  
    tabs:[
      {
          id:0,
          name:"入门藏品",
          isActive:true
      },
      {
          id:1,
          name:"精品藏品",
          isActive:false
      },
      {
          id:2,
          name:"专题",
          isActive:false
      },
    ],
  

  },

  handleItemChange(e) {
    console.log(e)
    //选择item的下标
    const {index} = e.detail;
    let {tabs} = this.data;
    //tab切换
    tabs.forEach((v,i)=>index === i?v.isActive=true:v.isActive=false);
    this.setData({
       tabs,
       infoList : '',
       item: ''+e.detail.index
    });
    //调用函数获取信息
    this.getCollections()
  },

  //获取藏品列表
  getCollections(){
    let _this = this
    wx.request({
      url: 'https://www.shoolos.cn/api/collections/',
      method:'GET',
      data:{
        // open_id:app.globalData.openid,
        item: _this.data.item,
        open_id: app.globalData.openid,
      },
      success(res){
        console.log(res)
        for(let i=0; i<res.data.code.length; i++){
          res.data.code[i].url = 'https://dlpic.shoolos.cn/api/' + res.data.code[i].url
        }
        _this.setData({
          infoList:res.data.code
        })
      },
      fail(res){
        console.log(res)
      }
    })
  },

  //调转到详情页
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

  





  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    this.getCollections()
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
  
})



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

    kind:[],    //类别
    age:[],     //断代
    class:[],   //器型

    eval_age:'断代',  //断代
    kind_:'类别',     //类别
    eval_kind:'器型', //器型
  
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
       item: ''+e.detail.index,
    });
    //调用函数获取信息
    this.getCollections()
  },

  //获取选定类别
  getKind: function (e) {
    let _this = this
    const index = parseInt(e.detail);
    console.log(index)
    console.log(_this.data.kind[index])
    this.setData({
      kind_: _this.data.kind[index]
    })
    _this.getCollections()
  },

  //获取选定断代
  getAge: function (e) {
    let _this = this
    const index = parseInt(e.detail);
    console.log(index)
    console.log(_this.data.age[index])
    this.setData({
      eval_age: _this.data.age[index]
    })
    _this.getCollections()
  },

  //获取选定器型
  getClass: function (e) {
    let _this = this
    const index = parseInt(e.detail);
    console.log(index)
    console.log(_this.data.class[index])
    this.setData({
      eval_kind: _this.data.class[index]
    })
    _this.getCollections()
  },




  getInfo(){
    let _this = this
        wx.request({
            url: 'https://www.shoolos.cn/api/list',
            header: {
                'content-type': 'application/json'
            },
            method: "GET",
            success(res) {
                console.log(res)
                _this.setData({
                  kind:res.data.code.kind,
                  age:res.data.code.age,
                  class:res.data.code.shape
                })
                console.log(_this.data.kind.kind)
            }
        })
  },

  //获取藏品列表
  getCollections(){
    let _this = this
    var t1 = _this.data.eval_age
    var t2 = _this.data.kind_
    var t3 = _this.data.eval_kind
    if(_this.data.eval_age == '断代'){
      t1 = ''
    }
    if(_this.data.kind_ =='类别'){
      t2 = ''
    }
    if(_this.data.eval_kind == '器型'){
      t3 = ''
    }
    console.log(t1)
    wx.request({
      url: 'https://www.shoolos.cn/api/collections/',
      method:'GET',
      data:{
        // open_id:app.globalData.openid,
        item: _this.data.item,
        eval_age:t1,
        kind:t2,
        eval_kind:t3,
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
    this.getInfo()
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


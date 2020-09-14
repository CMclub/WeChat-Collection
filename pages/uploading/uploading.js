// ../appraisal/appraisal.js
const app = getApp()


Page({
    /**
     * 页面的初始数据
     */
    data: {
      kind:'',          //类别
      eval_kind: '',    //器型
      text: '',         //描述
      id: '',           //id
      size: '',         //尺寸
      condition:'',     //成色
      eval_name: '',    //名称
      eval_age: '',     //断代
      id:0,             //任务id

        start: 0,   //传输图片成功的次数，如果上传传输成功则置0
        time: 0 ,   //图片完成数，不论成功与否，代替i计数，上传完成置0
        reload:0,   //上传次数，若为0则是初次上传，上传成功则置0


        idBack: '', //id-backup
        input_max: 200,

        errList:[],

        uploaderList: [],
        uploaderNum: 0,
        showUpload: true,

        select_dataset:null,

        show:true,
        //自定义eval数组测试
        eval: [],


    },

    getKind(e) {
      this.setData({kind: e.detail.value})
      console.log('kind:  ' + this.data.kind)
    },

    getEval_kind(e) {
      this.setData({eval_kind: e.detail.value})
      console.log('kind:  ' + this.data.eval_kind)
    },

    getSize(e) {
      this.setData({size: e.detail.value})
      console.log('kind:  ' + this.data.size)
    },

    getCondition(e) {
      this.setData({condition: e.detail.value})
      console.log('kind:  ' + this.data.condition)
    },

    getEval_name(e) {
      this.setData({eval_name: e.detail.value})
      console.log('kind:  ' + this.data.eval_name)
    },

    getEval_age(e) {
      this.setData({eval_age: e.detail.value})
      console.log('kind:  ' + this.data.eval_age)
    },


    onShareAppMessage: function (res) {
        console.log(res)
        return {
          title: '予复讲堂小程序',
          path:'/pages/index/index',
          success(res){
            console.log(res)
          }
        }
      },


    onLoad: function () {
    },





    //控制200以内
    countText(e) {
        this.setData({
            limitNum: e.detail.cursor
        })
        // console.log(e.detail)
        if (e.detail.cursor == 200) {
            wx.showModal({
                title: '提示',
                content: '您已达到输入上限',
            })
        }
    },

    getText(e) {
        this.data.text = e.detail.value
        console.log('text:  ' + this.data.text)
    },


    //删除图片
    clearImg: function (e) {
        var nowList = [];//新数据
        var uploaderList = this.data.uploaderList;//原数据
        for (let i = 0; i < uploaderList.length; i++) {
            if (i == e.currentTarget.dataset.index) {
                continue;
            } else {
                nowList.push(uploaderList[i])
            }
        }
        this.setData({
            uploaderNum: this.data.uploaderNum - 1,
            uploaderList: nowList,
            showUpload: true
        })
    },

    //展示图片
    showImg: function (e) {
        var that = this;
        wx.showLoading({
            title: '请稍等',
            mask: true
        })
        wx.previewImage({
            urls: that.data.uploaderList,
            current: that.data.uploaderList[e.currentTarget.dataset.index],
            success(res){
                wx.hideLoading({})
            },
            fail(res){
                wx.hideLoading({})
            }
        })
    },
    //上传图片
    addImg: function (e) {
        var that = this;
        wx.chooseImage({
            count: 9 - that.data.uploaderNum, // 默认9
            sizeType: ['original'],
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                let tempFilePaths = res.tempFilePaths;
                let uploaderList = that.data.uploaderList.concat(tempFilePaths);
                if (uploaderList.length == 9) {
                    that.setData({
                        showUpload: false
                    })
                }
                that.setData({
                    uploaderList: uploaderList,
                    uploaderNum: uploaderList.length,
                })
            },
            fail(res){
            }
        })
        
    },


    check() {
        let _this = this
        console.log(_this.data.errList[0])
        if (_this.data.kind != '' && _this.data.eval_kind != '' && _this.data.text != '' && _this.data.uploaderList != '' && _this.data.eval_age != '' && _this.data.eval_name != '' && _this.data.size != '' && _this.data.condition != '') {
            console.log('ok')
            
            _this.uploadInfo()

        } else {
            wx.showModal({
                title: '提示',
                content: '请填写所有条目后提交'
            })
        }
    },



//上传鉴定信息和图片
uploadInfo() {
    wx.showLoading({
        title: '提交中',
        mask: true
    })
    let _this = this

    if(_this.data.errList[0] == undefined && _this.data.reload ==0){
        var data = new Date()
        var now = ''+data.getFullYear()
        now = now.substring(2)
        if(data.getMonth() < 10){
            now = now + '0'+ (data.getMonth()+1)
        }
        if(data.getMonth() >= 10){
            now = now + (data.getMonth()+1)
        }
        if(data.getDate() < 10){
            now = now + '0'+data.getDate()
        }
        if(data.getDate() >= 10){
            now = now + data.getDate()
        }
        console.log(now)
        var round = Math.floor(Math.random()*(9999-1000+1)+1000);
        console.log(round)
        _this.setData({id: now+''+round})
        console.log(_this.data.id)
      }



    
        //打印要上传的图片临时路径
        var tempfilePaths = _this.data.uploaderList
        console.log(_this.data.uploaderList)
    

        //上传错误计数
        var count = 0;
        //重传计数
        var errcount = 0;
        //
        var num = 0
        //开始循环上传图片
        for (let i=0; i < _this.data.uploaderList.length; i++) {

            num = i;
            if(i == _this.data.uploaderList.length-1){
                num = 10
            }

            //如果为失败重传,修改结束条件
            if(_this.data.errList[0] != undefined && _this.data.reload !=0){
                //首次重传失败的图片
                if(i == 0){
                    count= 0;
                    errcount= 0;
                    _this.setData({
                        start: 0,
                        time: 0
                    })
                }
                //每次循环
                i = _this.data.errList[errcount]
                //重传完成
                if(_this.data.errList[errcount] == undefined ){
                    break;
                }

                errcount++

                
            }

    
            //获取文件后缀名 - exten
            var exten = tempfilePaths[i].split('.');
            console.log(exten)
            exten = exten[exten.length - 1]
            
            //开始上传
            const uploadTask = wx.uploadFile({
                url: 'https://www.shoolos.cn/api/preview/',
                filePath: tempfilePaths[i],
                name: 'file',
                timeout: 100000,
                header: {'content-type': 'application/json'},
                formData: {
                    'kind': _this.data.kind,              //类别
                    'eval_kind': _this.data.eval_kind,    //器型
                    'text': _this.data.text,              //描述
                    'exten': exten,                       //图片后缀名
                    'id': _this.data.id,                  //id
                    'num': num,                             //图片序号
                    'size': _this.data.size,              //尺寸
                    'condition': _this.data.condition,    //成色
                    'eval_name': _this.data.eval_name,    //名称
                    'eval_age': _this.data.eval_age,      //断代
                    'item': 0
                },
                success(res) {
                    //传输成功 ， time +1
                    _this.setData({
                        time: _this.data.time + 1
                    })
                    console.log('上传时的num'+i)
                    console.log(_this.data.start)
                    console.log(_this.data.time)
                    console.log(_this.data.errList)


                    console.log(res)
                    //分离出code上传状态
                    var tmp = res.data.split('"')
                    tmp = tmp[2]
                    tmp = tmp.split('}')
                    tmp = tmp[0]
                    tmp = tmp.split(' ')
                    tmp = tmp[1]
                    
                    console.log(_this.data.start)

                    //这张图片上传成功
                    if(tmp == '1'){
                        //服务器写入成功，start 累计+1
                        _this.setData({
                            start : _this.data.start+1
                        })
                        console.log(_this.data.start)

                        //**初次** 上传图片总数 === 已成功上传数 ， 则此次任务成功
                        console.log(_this.data.start)
                        if(_this.data.uploaderList.length == _this.data.start){
                            wx.hideLoading()
                            count = 0
                            errcount = 0;
                            _this.setData({
                                start : 0,
                                time: 0,
                                errList:[],
                                reload:0,
                            })
                            console.log(_this.data.start)
                            wx.redirectTo({
                                url: "../record/record"
                            })
                        }
                        //**重传** 上传图片数 == 待重传数 ， 则此次任务成功
                        if(_this.data.errList.length == _this.data.start && _this.data.reload !=0){
                            wx.hideLoading()
                            count = 0
                            errcount = 0;
                            _this.setData({
                                start : 0,
                                time: 0,
                                errList:[],
                                reload:0
                            })
                            console.log(_this.data.start)
                            wx.switchTab({
                                url: "../collections/collections"
                            })
                        }
                    }
                    //这张图片上传写入失败
                    else{
                        count++;
                        console.log(_this.data.errList)
                        
                    }
                    //**重传** 全部上传成功，且有上传失败，数据置0
                    if(_this.data.time == _this.data.errList.length && _this.data.reload !=0){
                        count = 0
                        errcount = 0;
                        _this.setData({
                            time:0,
                            reload: _this.data.reload+1
                        })
                        console.log(_this.data.errList)
                        wx.hideLoading()
                        wx.showModal({
                            title: '错误',
                            content: '服务器写入失败383',
                            confirmText: '重试',
                            cancelText:'取消',
                            success (res) {
                              if (res.confirm) {
                                console.log('用户点击确定')
                                wx.showLoading({
                                    title: '提交中',
                                })
                                //再次上传
                                _this.uploadInfo()


                              } else if (res.cancel) {
                                console.log('用户点击取消')
                                count = 0
                                errcount = 0;
                                _this.setData({
                                    start : 0,
                                    time: 0,
                                    errList:[],
                                    reload:0
                                })
                                //删除之前数据库不完整数据
                                wx.request({
                                    url: 'https://www.shoolos.cn/api/cancel/',
                                    success(res){console.log(res)}
                                })
                              }
                            }
                          })
                    }

                    //**初次** 全部上传成功，且有上传失败，数据置0
                    if(_this.data.time == _this.data.uploaderList.length){
                        count = 0
                        errcount = 0;
                        _this.setData({
                            time:0,
                            reload: _this.data.reload+1
                        })
                        console.log(_this.data.errList)
                        wx.hideLoading()
                        wx.showModal({
                            title: '错误',
                            content: '服务器写入失败428',
                            confirmText: '重试',
                            cancelText:'取消',
                            success (res) {
                              if (res.confirm) {
                                console.log('用户点击确定')
                                wx.showLoading({
                                    title: '提交中',
                                })
                                //再次上传
                                _this.uploadInfo()


                              } else if (res.cancel) {
                                console.log('用户点击取消')
                                count = 0
                                errcount = 0;
                                _this.setData({
                                    start : 0,
                                    time: 0,
                                    errList:[],
                                    reload:0
                                })
                                //删除之前数据库不完整数据
                                wx.request({
                                    url: 'https://www.shoolos.cn/api/cancel/',
                                    success(res){console.log(res)}
                                })
                              }
                            }
                          })
                    }
                },
                fail(res){
                    count++;
                    console.log(res)
                    if(res.errMsg == 'uploadFile:fail socket timeout error' && count == _this.data.uploaderList.length){
                        wx.hideLoading()
                        _this.setData({
                            start : 0,
                            time: 0,
                            errList:[],
                            reload:0
                        })
                        wx.showModal({
                            title: '提示',
                            content: '已超时，请刷新重试'
                          })
                    }
                    //仅上传一张且失败 或 最后一张上传失败
                    if(_this.data.time == _this.data.uploaderList.length || count == _this.data.uploaderList.length){
                        _this.setData({
                            time:0
                        })
                        console.log(_this.data.errList)
                        wx.hideLoading()
                        wx.showModal({
                            title: '错误',
                            content: '上传失败',
                            confirmText: '确定',
                            cancelText:'取消',
                            success (res) {
                              if (res.confirm) {
                                console.log('用户点击确定')
                                count = 0
                                errcount = 0;
                                _this.setData({
                                    start : 0,
                                    time: 0,
                                    errList:[],
                                    reload:0
                                })
                                //删除之前数据库不完整数据
                                wx.request({
                                    url: 'https://www.shoolos.cn/api/cancel/',

                                    success(res){console.log(res)}
                                })
                              } else if (res.cancel) {
                                console.log('用户点击取消')
                                count = 0
                                errcount = 0;
                                _this.setData({
                                    start : 0,
                                    time: 0,
                                    errList:[],
                                    reload:0
                                })
                                //删除之前数据库不完整数据
                                wx.request({
                                    url: 'https://www.shoolos.cn/api/cancel/',
 
                                    success(res){console.log(res)}
                                })
                              }
                            }
                          })
                    }
                }
            })
            uploadTask.onProgressUpdate((res) => {
                console.log('上传进度', res.progress)
            })
        }

    },





})
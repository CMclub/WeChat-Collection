// components/tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      tabs:{
          type:Array
      }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
      handleItemTab:function (e) {
          const {index} = e.currentTarget.dataset;

          this.triggerEvent("itemChange",{index});

      }
  }
})

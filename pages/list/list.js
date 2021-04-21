// pages/listAll/listAll.js
const app = getApp();
import api from "../../utils/api.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: null,
    password: null,
    author: null,
    result: [{number: "001", name: "tom", class: "cs"}],
    token: null,  // 判断请求哪个接口
    keyword: null,

    haveInfo: true,
    notHaveInfo: false,

    pageIndex: 1,
    pageSize: 30,  // 分页大小
    count: 1,
    // 标志是否还有更多信息（是否要显示 没有更多信息 提示）
    haveMore: true,
    notHaveMore: false
  },

  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  sleep: function(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    that.data.username = options.username
    that.data.password = options.password
    that.data.author = options.author
    wx.request({
      url: api.login,
      data: {
        username: that.data.username,
        password: that.data.password,
        author: that.data.author
      },
      method: 'GET',
      header: {apikey:'a37c01591e47494fe320137dbc0fd423'}, // 设置请求的 header
      success(res) {
        console.log(res.data)
        that.setData({
          result: res.data
        });
        // for (let i in res.data)
        // {
        //   that.data.result.push(res.data[i])
        // }
      }
    });
   

    //this.getDate();

    wx.showLoading({
      title: '加载中',
    });

    this.sleep(500).then(() => {
      console.log(that.data.result)
      console.log(that.data.result.length);
      if (that.data.result.length > 0) {
        that.setData({
          haveInfo: true,
          notHaveInfo: false
        });
      } else {
        that.setData({
          haveInfo: false,
          notHaveInfo: true
        });
      }
    });
    
    setTimeout(function(){
      wx.hideLoading();

      if(Math.ceil(that.data.count/that.data.pageSize) == that.data.pageIndex) {
        that.setData({
          haveMore: false,
          notHaveMore: true
        });
      }
    }, 1000);
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
    if (this.data.pageIndex < Math.ceil(this.data.count / this.data.pageSize)) {
      this.data.pageIndex++;
      this.getDate();
    } else {
      this.setData({
        haveMore: false,
        notHaveMore: true
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
   
  // 查看详细信息
  detail: function (evt) {
    // // 将信息持久化存储到本地，供下一页面使用
    wx.setStorageSync("click", evt.currentTarget.dataset)
    console.log(evt)
    var that = this
    var index = evt.currentTarget.dataset.index
    // 延时跳转，确保存储完成
    wx.showLoading({
      title: '加载中',
    })
   
    setTimeout(function () {
      wx.hideLoading()
      wx.navigateTo({
        url: '../detail/detail'
      })
    }, 500);
  }
});
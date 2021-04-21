// pages/bind/bind.js
const app = getApp();
import api from "../../utils/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: null,  // 工号
    password: null,  // 姓名
    author: "teacher",
    items:[
      {value: "student", name:"学生"},
      {value: "teacher", name:"老师"}
      
    ]
  },
  radioChange(e) {
    var that = this
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    console.log(that.data.author)
    that.setData({
      author : e.detail.value
    })
    console.log(that.data.author)
    const items = this.data.items
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }
    this.setData({
      items
    })
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

  getUsername: function (e) {
    this.setData({ username: e.detail });
  },

  getPassword: function (e) {
    this.setData({ password: e.detail });
  },

  submit: function (e) {
    const that = this;
    // 提交绑定信息
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
        console.log(res.data);
        var queryBean = JSON.stringify(res.data)
        console.log(queryBean)
        if (res.data) {
          wx.showLoading({
            title: '登陆中'
          });
          app.globalData.access = true
          setTimeout(function () {
            wx.hideLoading();
            wx.showToast({
              title: '登录成功'
            });
            // 绑定成功后跳转到上级页面
            setTimeout(function(){
              wx.redirectTo({
                url: '../list/list?username=' + that.data.username+'&password=' + that.data.password+'&author=' + that.data.author,
              })
            },200);
          }, 500);
        } else {
          // 后台没有添加信息
          wx.showToast({
            title: '没有权限，请联系管理员',
            icon: 'none'
          });
        }
      },
      fail(err) {
        wx.showToast({
          title: '请重试',
          icon: 'none'
        });
      }
    });
  }
})
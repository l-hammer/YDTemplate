/**
 * 上线时拷贝dist目录下生成的样式，并在./template.tpl引入对应脚本
 */
import $ from 'jquery';
import 'jquery-modal';
import Swiper from 'swiper';
import PerfectScrollbar from 'perfect-scrollbar';
import '../../assets/examples/web.scss';

/**
 * 开发JS,上线直接拷贝一下内容到./template.tpl
 */
var YD = {},
  fouthAnnual;

YD.FouthAnnual = function () {
  this.$unLoginBtn = $('.unLogin');
  this.$tabBtnEles = $('#tabBtns');
  this.$startDate = '2018-01-04 10:30:00';
  this.$endDate = '2018-06-14 23:59:59';
  this.$time = ['10:30:00', '14:30:00', '17:30:00'];
  this.$timer = null;
  this.$swiper = null;
  this.$exchangeBtnEles = $('.shop_btn:not(.gray)');
  this.$activityId = $('#activity_id');
  this.$isEnd = $('#isEnd').val() !== 0;
  this.$isLogin = $('#isLogin').val();
  this.$getCouponBtn = $('#getCouponBtn');
  this.$scrollTop = $('#scrollTop');
  this.$recordTbody = $('#recordTbody');
  this.$successBtn = $('#successBtn');
  this.init = function () {
    this.events();
    // 对话框
    // this.YDModel();
    // 滚动条
    new PerfectScrollbar('#recordTbody', {
      wheelPropagation: true,
    });
    $(window).scroll(function () {
      var wst = $(window).scrollTop() + ($(window).height() / 2),
        i;
      for (i = 2; i < 6; i++) {
        if ($('#floor' + i).offset().top <= wst) {
          $('.menu_item').removeClass('active');
          $('a[href="#floor' + i + '"]').addClass('active');
        }
      }
    });
  };
  this.events = function () {
    var self = this;
    self.$unLoginBtn.on('click', function () {
      YD.showLogin();
    });
    self.YDModel = function () {
      var modalTemplate = '' +
        "<div class='dg-modal yd-modal' id='get-form'>\n" +
        "<h3 class='modal-header'>领取结果</h3>\n" +
        "<p class='modal-content desp'>恭喜亲领取成功，请在“我的账户”-“优惠券”<a class='active' href='#'>查看</a></p>\n" +
        "<div class='modal-footer clearfix'>\n" +
        "<a href='#close' rel='modal:close' class='btn fr cancel'>取消</a>\n" +
        "<a class='btn fr success' id='successBtn'>确定</a>\n" +
        '</div>\n' +
        '</div>';
      $(modalTemplate).appendTo('body').modal({
        fadeDuration: 250,
        showClose: true,
        closeClass: 'YDSICON yds-icon-close',
        closeText: '',
      });
      $('#successBtn').on('click', function () {
        $.modal.close();
      });
      return false;
    };
    self.$getCouponBtn.on('click', function () {
      if (self.$isLogin) {
        $.ajax({
          url: '/webapi/send_user_bonus',
          type: 'POST',
          success: function (res) {
            var result = $.parseJSON(res);
            if (result && result.code === 0) {
              self.YDDialog(result.message, false, 1);
            } else {
              self.$isEnd = result.code === 5;
              self.$isEnd ? self.YDDialog(result.message, self.$isEnd) : self.YDDialog(result.message);
            }
          },
          error: function (error) {
            alert(error);
          },
        });
      } else {
        YD.showLogin();
      }
    });
    self.$swiper = new Swiper('.swiper-container', {
      slidesPerView: 3,
      spaceBetween: 28,
      slidesPerGroup: 3,
      loop: false,
    });
    self.$tabBtnEles.on('click', function ($evt) {
      var $ele = $($evt.target),
        id = $ele.attr('data-id');
      if ($evt.target.tagName === 'A') {
        self.$swiper.slideTo(id * 3, 800, false);
      }
    });
    self.$exchangeBtnEles.on('click', function () {
      var data = {};
      if (self.$isLogin) {
        data.activity_id = self.$activityId.val();
        data.type = $(this).data('id');
        $.ajax({
          url: '/ajax.php?modInfo=special/action_lend_vote',
          type: 'POST',
          data: data,
          success: function (res) {
            var result = $.parseJSON(res);
            if (result && result.err_code === 0) {
              self.YDDialog(result.err_msg, false, 1);
            } else {
              self.$isEnd = result.err_code === 5;
              self.$isEnd ? self.YDDialog(result.err_msg, self.$isEnd) : self.YDDialog(result.err_msg);
            }
          },
          error: function (error) {
            alert(error);
          },
        });
      } else {
        YD.showLogin();
      }
    });
    // 滚动侧边栏
    self.$scrollTop.on('click', function () {
      $(window).scrollTop() === 0 ? false : ($('html, body').stop(true).animate({ scrollTop: 0 }, 600));
    });
    self.getDateDiff = function (startTime, endTime) {
      var timeArray = [],
        timeEnd = endTime.getTime(),
        timeNow = startTime, // 获取当前时间
        timeDistance, // 时间差：活动结束时间减去当前时间
        intDay,
        intHour,
        intMinute,
        intSecond;
      timeNow = timeNow.getTime();
      timeDistance = timeEnd - timeNow;
      if (timeDistance >= 0) {
        // 相减的差数换算成天数
        intDay = Math.floor(timeDistance / 86400000);
        timeDistance -= intDay * 86400000;
        // 相减的差数换算成小时
        intHour = Math.floor(timeDistance / 3600000);
        timeDistance -= intHour * 3600000;
        // 相减的差数换算成分钟
        intMinute = Math.floor(timeDistance / 60000);
        timeDistance -= intMinute * 60000;
        // 相减的差数换算成秒数
        intSecond = Math.floor(timeDistance / 1000);
        // 判断小时小于10时，前面加0进行占位
        if (intHour < 10) intHour = '0' + intHour;
        // 判断分钟小于10时，前面加0进行占位
        if (intMinute < 10) intMinute = '0' + intMinute;
        // 判断秒数小于10时，前面加0进行占位
        if (intSecond < 10) intSecond = '0' + intSecond;
        // 显示倒计时效果
        timeArray.push(intDay);
        timeArray.push(intHour);
        timeArray.push(intMinute);
        timeArray.push(intSecond);
      }
      return timeArray;
    };
    self.addDate = function (date, dadd) {
      var a = date;
      a = a.valueOf();
      a += dadd * 24 * 60 * 60 * 1000;
      a = new Date(a);
      return a;
    };
    self.start_count_down_time = function () {
      var arr,
        nextDate,
        curDate = new Date(),
        nextTime = new Date(),
        startDate = self.convertDate(self.$startDate),
        endDate = self.convertDate(self.$endDate),
        d1 = self.convertDate(self.date2str(curDate, 'yyyy-MM-dd 10:30:00')),
        d2 = self.convertDate(self.date2str(curDate, 'yyyy-MM-dd 14:30:00')),
        d3 = self.convertDate(self.date2str(curDate, 'yyyy-MM-dd 17:30:00'));
      if (curDate < startDate) {
        nextTime = startDate;
      } else if (curDate < d1) {
        nextTime = d1; // 10:30
      } else if (curDate >= d1 && curDate < d2) {
        nextTime = d2; // 14:30
      } else if (curDate >= d2 && curDate < d3) {
        nextTime = d3; // 17:30
      } else if (curDate >= self.convertDate(self.date2str(endDate, 'yyyy-MM-dd 17:30:00'))) {
        if (self.$timer) {
          clearInterval(self.$timer);
          self.$timer = null;
        }
        $('#count_down_time').html('00小时00分00秒'); // 活动结束
        return;
      } else {
        nextDate = self.addDate(curDate, 1);
        nextTime = self.convertDate(self.date2str(nextDate, 'yyyy-MM-dd 10:30:00')); // 10:30
      }
      arr = self.getDateDiff(curDate, nextTime);
      if (arr[0] === 0 && arr[1] === '00' && arr[2] === '00' && arr[3] === '00') {
        if (self.$timer) {
          clearInterval(self.$timer);
          self.$timer = null;
        }
        // self.action_newyear_2018_getstate(true);
      } else if (!self.$timer) {
        self.$timer = setInterval(function () {
          self.start_count_down_time();
        }, 1000);
      }
      if (arr[0] > 0) {
        $('#count_down_time').html(arr[0] + '天' + arr[1] + '小时' + arr[2] + '分' + arr[3] + '秒');
      } else {
        $('#count_down_time').html(arr[1] + '小时' + arr[2] + '分' + arr[3] + '秒');
      }
    };
    self.convertDate = function (date) {
      return new Date(date.replace(/-/g, '/'));
    };
    self.date2str = function (x, y) {
      var z = {
        y: x.getFullYear(),
        M: x.getMonth() + 1,
        d: x.getDate(),
        h: x.getHours(),
        m: x.getMinutes(),
        s: x.getSeconds(),
      };
      return y.replace(/(y+|M+|d+|h+|m+|s+)/g, function (v) {
        return ('' + z[v.slice(-1)]).slice(-(v.length > 2 ? v.length : 2));
      });
    };
    self.start_count_down_time();
  };
};

fouthAnnual = new YD.FouthAnnual();
fouthAnnual.init();

/**
 * 热模块替换，开发环境使用
 */
if (module.hot) {
  module.hot.accept();
}

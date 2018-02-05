/**
 * 上线时拷贝dist目录下生成的样式，并在./template.tpl引入对应脚本
 */
import $ from "jquery";
import "jquery-modal";
import Swiper from "swiper";
import PerfectScrollbar from "perfect-scrollbar";
import '../../assets/examples/web.scss';

/**
 * 开发JS,上线直接拷贝一下内容到./template.tpl
 */
var YD = YD || {};
YD.FouthAnnual = function(){

	this.$unLoginBtn = $('.unLogin');
	this.$tabBtnEles = $('#tabBtns');
    this.$start_date = "2018-01-04 10:30:00";
    this.$end_date = "2018-01-14 23:59:59";
    this.$time = ['10:30:00', '14:30:00', '17:30:00'];
	this.$timer = null;
	this.$swiper = null;
	this.$exchangeBtnEles = $('.shop_btn:not(.gray)');
	this.$activityId = $('#activity_id');
	this.$isEnd = $('#isEnd').val() == 0 ? false : true;
	this.$isLogin = $('#isLogin').val();
	this.$getCouponBtn = $('#getCouponBtn');
	this.$scrollTop = $('#scrollTop');
    this.$recordTbody = $('#recordTbody');
    this.$successBtn = $('#successBtn');
    
    this.init = function(){
        this.events();
        // 对话框
        // this.YDModel();
        // 滚动条
        new PerfectScrollbar('#recordTbody');
        $(window).scroll(function(){                                                                                                                                          
			var wst = $(window).scrollTop() + $(window).height() / 2;
			for (var i=2; i<6; i++){            
				if($("#floor"+i).offset().top<=wst){
					$(".menu_item").removeClass("active");
					$('a[href="#floor'+i+'"]').addClass("active");
				}
			} 
		});
    }
    this.events = function(){
		var self = this;
		self.$unLoginBtn.on('click', function(){
			YD.showLogin(); return;
        });
        self.YDModel = function(result, isend, load){
            var modal_template="\
                <div class='dg-modal yd-modal' id='get-form'>\
                    <h3 class='modal-header'>领取结果</h3>\
                    <p class='modal-content desp'>恭喜亲领取成功，请在“我的账户”-“优惠券”<a class='active' href='#'>查看</a></p>\
                    <div class='modal-footer clearfix'>\
                        <a href='#close' rel='modal:close' class='btn fr cancel'>取消</a>\
                        <a class='btn fr success' id='successBtn'>确定</a>\
                    </div>\
                </div>";                               
            $(modal_template).appendTo('body').modal({
                fadeDuration: 250,
                showClose: true,
                closeClass: 'YDSICON yds-icon-close',
                closeText: ''
            });
            $('#successBtn').on('click', function(){
                $.modal.close();
            });
            return false;
        }
		self.$getCouponBtn.on('click', function(){
			if(self.$isLogin){
				$.ajax({
					url: '/webapi/send_user_bonus',                                                                                                  
					type: 'POST',
					success: function(res){
						var result = $.parseJSON(res);
						if(result && result.code === 0){
							self.YDDialog(result.message, false, 1);
						}else{
							self.$isEnd = result.code == 5 ? true : false;
							self.$isEnd ? self.YDDialog(result.message, self.$isEnd) : self.YDDialog(result.message);
						}
					},
					error: function(res){
						alert(res)
					}
				})
			}else{
				YD.showLogin(); return;
			}
		});
		self.$swiper = new Swiper('.swiper-container', {
			slidesPerView: 3,
			spaceBetween: 28,
			slidesPerGroup: 3,
			loop: false,
		});
		self.$tabBtnEles.on('click', function($evt){
			var $ele = $($evt.target);
			var id = $ele.attr('data-id');
			if($evt.target.tagName === "A"){
				self.$swiper.slideTo(id*3, 800, false);
			}
		})
		self.$exchangeBtnEles.on('click', function(){
			console.log('exchange');
			var data = {};
			if(self.$isLogin){
				data.activity_id = self.$activityId.val();
				data.type = $(this).data('id'); 
				$.ajax({
					url: '/ajax.php?modInfo=special/action_lend_vote',                                                                                                        
					type: 'POST',
					data: data,
					success: function(res){
						var result = $.parseJSON(res);
						if(result && result.err_code === 0){
							self.YDDialog(result.err_msg, false, 1);
						}else{
							self.$isEnd = result.err_code == 5 ? true : false;
							self.$isEnd ? self.YDDialog(result.err_msg, self.$isEnd) : self.YDDialog(result.err_msg);
						}
					},
					error: function(res){
						alert(res)
					}
				})
			}else{
				YD.showLogin();return false;   
			}
		});
		// 滚动侧边栏
		self.$scrollTop.on('click', function(){
			$(window).scrollTop() === 0 ? false : ($('html, body').stop(true).animate({ scrollTop: 0 },600));
		});
        self._GetDateDiff = function(startTime, endTime, diffType) {
            var time_array = [];
            var time_end = endTime.getTime();
            var time_now = startTime; // 获取当前时间
            time_now = time_now.getTime();
            var time_distance = time_end - time_now; // 时间差：活动结束时间减去当前时间  
            var int_day, int_hour, int_minute, int_second;
            if (time_distance >= 0) {
                // 相减的差数换算成天数  
                int_day = Math.floor(time_distance / 86400000)
                time_distance -= int_day * 86400000;
                // 相减的差数换算成小时
                int_hour = Math.floor(time_distance / 3600000)
                time_distance -= int_hour * 3600000;
                // 相减的差数换算成分钟  
                int_minute = Math.floor(time_distance / 60000)
                time_distance -= int_minute * 60000;
                // 相减的差数换算成秒数 
                int_second = Math.floor(time_distance / 1000)
                // 判断小时小于10时，前面加0进行占位
                if (int_hour < 10) int_hour = "0" + int_hour;
                // 判断分钟小于10时，前面加0进行占位     
                if (int_minute < 10) int_minute = "0" + int_minute;
                // 判断秒数小于10时，前面加0进行占位
                if (int_second < 10) int_second = "0" + int_second;
                // 显示倒计时效果      
                time_array.push(int_day);
                time_array.push(int_hour);
                time_array.push(int_minute);
                time_array.push(int_second);
            }
            return time_array;
        };
        self._addDate = function(date, dadd) {
            var a = date;
            a = a.valueOf()
            a = a + dadd * 24 * 60 * 60 * 1000
            a = new Date(a)
            return a;
        };
        self.start_count_down_time = function() {
            var cur_date = new Date(),
                nextTime = new Date();
            var start_date = self._convertDate(self.$start_date);
            var end_date = self._convertDate(self.$end_date);
    
            var d1 = self._convertDate(self._date2str(cur_date, "yyyy-MM-dd 10:30:00"));
            var d2 = self._convertDate(self._date2str(cur_date, "yyyy-MM-dd 14:30:00"));
            var d3 = self._convertDate(self._date2str(cur_date, "yyyy-MM-dd 17:30:00"));
            if (cur_date < start_date) {
                nextTime = start_date;
            } else {
                if (cur_date < d1) {
                    nextTime = d1;
                    //10:30
                } else if (cur_date >= d1 && cur_date < d2) {
                    //14:30
                    nextTime = d2;
                } else if (cur_date >= d2 && cur_date < d3) {
                    //17:30
                    nextTime = d3;
                } else {
                    //10:30
                    if (cur_date >= self._convertDate(self._date2str(end_date, "yyyy-MM-dd 17:30:00"))) {
                        if (self.$timer) {
                            clearInterval(self.$timer);
                            self.$timer = null;
                        }
                        $('#count_down_time').html("00小时00分00秒");   //活动结束
                        return;
                    } else {
                        var nextDate = self._addDate(cur_date, 1);
                        nextTime = self._convertDate(self._date2str(nextDate, "yyyy-MM-dd 10:30:00"));
                    }
                }
            }
            var arr = self._GetDateDiff(cur_date, nextTime);
    
            if (arr[0] == 0 && arr[1] == "00" && arr[2] == "00" && arr[3] == "00") {
                if (self.$timer) {
                    clearInterval(self.$timer);
                    self.$timer = null;
                }
                // self.action_newyear_2018_getstate(true);
            } else {
                if (!self.$timer) {
                    self.$timer = setInterval(function () {
                        self.start_count_down_time();
                    }, 1000);
                }
            }
            if (arr[0] > 0) {
                $('#count_down_time').html(arr[0] + "天" + arr[1] + "小时" + arr[2] + "分" + arr[3] + "秒");
            } else {
                $('#count_down_time').html(arr[1] + "小时" + arr[2] + "分" + arr[3] + "秒");
            }
    
        };
        self._convertDate = function(date) {
            return new Date(date.replace(/-/g, "/"));
        };
        self._date2str = function(x, y) {
            var z = {
                y: x.getFullYear(),
                M: x.getMonth() + 1,
                d: x.getDate(),
                h: x.getHours(),
                m: x.getMinutes(),
                s: x.getSeconds()
            };
            return y.replace(/(y+|M+|d+|h+|m+|s+)/g, function(v) {
                return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-(v.length > 2 ? v.length : 2))
            });
		};
		self.start_count_down_time();
    }
}
   
var fouthAnnual = new YD.FouthAnnual();
fouthAnnual.init();

/**
 * 热模块替换，开发环境使用
 */
if (module.hot) {
	module.hot.accept();
}
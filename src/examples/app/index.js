/**
 * jax采用zepto.ajax
 * 上线时拷贝dist目录下生成的样式，并在./template.tpl引入对应脚本
 */
import Vue from 'vue/dist/vue';
import axios from 'axios';
import Router from 'vue-router';
import VAnimateCss from 'v-animate-css';
import '../../assets/examples/app.scss';

Vue.use(VAnimateCss);
Vue.use(Router);

/**
 * 使用ES5写法，上线时直接拷贝以下内容到./template.tpl
 * this is a mark line(以此线为标准，autocopy脚本会自动拷贝其之后的代码)
 */

var pageSignApp,
    pageSignSteps,
    routes,
    router;

pageSignApp = Vue.extend({
    template: '#pageApp',
    computed: {
        progress: function () {
            return this.$root.progress;
        },
    },
    data: function () {
        return {
            transitionSlideInDown: {
                classes: 'slideInDown',
                duration: 1000,
                delay: 0,
            },
            transitionZoomIn: {
                classes: 'zoomIn',
                duration: 1000,
                delay: 0,
            },
            transitionZoomIn200: {
                classes: 'zoomIn',
                duration: 1000,
                delay: 200,
            },
            transitionZoomIn400: {
                classes: 'zoomIn',
                duration: 1000,
                delay: 400,
            },
            transitionFadeInUp400: {
                classes: 'fadeInUp',
                duration: 1000,
                delay: 400,
            },
            transitionFadeInUp600: {
                classes: 'fadeInUp',
                duration: 1000,
                delay: 600,
            },
            transitionFadeInUp800: {
                classes: 'fadeInUp',
                duration: 1000,
                delay: 800,
            },
            transitionZoomIn600: {
                classes: 'zoomIn',
                duration: 1000,
                delay: 600,
            },
            transitionZoomIn800: {
                classes: 'zoomIn',
                duration: 1000,
                delay: 800,
            },
            transitionZoomIn1000: {
                classes: 'zoomIn',
                duration: 1000,
                delay: 1000,
            },
            transitionFadeInUp1000: {
                classes: 'fadeInUp',
                duration: 1000,
                delay: 1000,
            },
            transitionFadeInLeft: {
                classes: 'fadeInLeft',
                duration: 1000,
                delay: 0,
            },
            transitionFadeInRight: {
                classes: 'fadeInRight',
                duration: 1000,
                delay: 0,
            },
            transitionFlipInX200: {
                classes: 'flipInX',
                duration: 1000,
                delay: 200,
            },
            countdown: '12:00:00',
            // startDate: '2018/01/20 17:00:00',
            startDate: '2017/12/26 17:00:00',
            timer: null,
            username: '',
            userphone: null,
            userinfo: {

            },
            page_show: 0,
            openedGiftBox: false,
            showDialog: false,
        };
    },
    watch: {
        progress: function (value) {
            var self = this;
            if (!value) {
                self.start_count_down();
            }
        },
    },
    mounted: function () {
        var self = this;
        if (!self.progress) {
            self.start_count_down();
        }
    },
    methods: {
        openGiftBox: function () {
            this.showDialog = true;
        },
        start_count_down: function () {
            var self = this,
                currentDate = new Date(),
                startDate = new Date(self.startDate),
                convertMilli12h = 12 * 60 * 60 * 1000,
                // convertMilli12h = 60 * 1000,
                diff = startDate.getTime() - currentDate.getTime(),
                h = 0,
                m = 0,
                s = 0;
            if (diff >= 0 && diff <= convertMilli12h) {
                self.page_show = 2;
                h = Math.floor(diff / 1000 / 60 / 60 % 24);
                m = Math.floor(diff / 1000 / 60 % 60);
                s = Math.floor(diff / 1000 % 60);
                h = h < 10 ? '0' + h : h;
                m = m < 10 ? '0' + m : m;
                s = s < 10 ? '0' + s : s;
                if (self.timer && Math.floor(diff / 1000) === 0) {
                    clearInterval(self.timer);
                    self.timer = null;
                    self.countdown = '00:00:00';
                }
                self.countdown = h + ':' + m + ':' + s;
                self.timer = setInterval(function () {
                    self.start_count_down();
                }, 1000);
            } else if (diff < 0) {
                self.page_show = 3;
                if (self.timer) {
                    clearInterval(self.timer);
                    self.timer = null;
                }
                self.countdown = '00:00:00';
            } else {
                self.timer = setInterval(function () {
                    self.start_count_down();
                }, 1000);
                self.page_show = 1;
            }
        },
        sign: function () {
            var self = this;
            // if (self.username === '') {
            //     alert('姓名不能为空');
            //     return false;
            // }
            // if (self.userphone === '') {
            //     alert('手机号不能为空');
            //     return false;
            // }
            // if (self.userphone.lenght !== 11 || Number(self.userphone) === 'number') {
            //     alert('手机号格式错误');
            //     return false;
            // }
            self.action_yeal_sign();
            return true;
        },
        resign: function () {
            this.username = '';
            this.userphone = '';
            this.page_show = 3;
        },
        restart: function () {
            this.showDialog = false;
            if (this.userinfo.number === 521) {
                this.page_show = 5;
            } else {
                this.openedGiftBox = true;
            }
        },
        cancelDialog: function () {
            this.showDialog = false;
        },
        action_yeal_sign: function () {
            var self = this,
                data = {
                    username: self.username,
                    userphone: self.userphone,
                };
            self.page_show = 4;
            self.userinfo = {
                name: 'LHammer',
                reward: 1, // 0：无2%加息券； 1：有2%加息券
                sign: 1, // 0：第一次签到；1：已经签到过
                number: 521, // 桌号
            };
            self.restart();
            axios({
                url: '/webapi/action_yeal_sign',
                method: 'POST',
                data: data,
            }).then(function (res) {
                if (res.code === 0) {
                    self.userinfo = res.data;
                } else {
                    alert(res.message);
                }
            }).catch(function (error) {
                alert(error);
            });
        },
    },
});
pageSignSteps = Vue.extend({
    template: '#signSteps',
    data: function () {
        return {
            transitionFadeInLeft: {
                classes: 'fadeInLeft',
                duration: 1000,
                delay: 0,
            },
            transitionFadeInLeft400: {
                classes: 'fadeInLeft',
                duration: 1000,
                delay: 400,
            },
            transitionFadeInLeft800: {
                classes: 'fadeInLeft',
                duration: 1000,
                delay: 800,
            },
            transitionFadeInRight: {
                classes: 'fadeInRight',
                duration: 1000,
                delay: 0,
            },
            transitionFadeInRight600: {
                classes: 'fadeInRight',
                duration: 1000,
                delay: 600,
            },
            transitionFadeInRight1000: {
                classes: 'fadeInRight',
                duration: 1000,
                delay: 1000,
            },
            transitionFlipInX200: {
                classes: 'flipInX',
                duration: 1000,
                delay: 200,
            },
            transitionZoomIn600: {
                classes: 'zoomIn',
                duration: 1000,
                delay: 600,
            },
            transitionZoomIn1000: {
                classes: 'zoomIn',
                duration: 1000,
                delay: 1000,
            },
            transitionFadeInUp400: {
                classes: 'fadeInUp',
                duration: 1000,
                delay: 400,
            },
        };
    },
});
routes = [
    {
        name: 'pageSignApp',
        path: '/',
        component: pageSignApp,
    },
    {
        name: 'pageSignSteps',
        path: '/pageSignSteps',
        component: pageSignSteps,
    },
];
router = new Router({
    routes: routes,
});

new Vue({
    router: router,
    data: {
        count: 0,
        progress: true,
        process_percent: 0,
        imgs: [
            'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2017/12/year_sign/progress.jpg',
            'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2017/12/year_sign/page01bg_bai.jpg',
            'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2017/12/year_sign/citybg.png',
            'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2017/12/year_sign/page01_text_ydzy_min.png',
            'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2017/12/year_sign/page01_text_date.png',
            'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2017/12/year_sign/page01_text_zsqh_min.png',
            'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2017/12/year_sign/page02_text_bjdl.png',
            'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2017/12/year_sign/planet_light_min.png',
            'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2017/12/year_sign/page02_text_zsqh.png',
            'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2017/12/year_sign/page03_text_top.png',
            'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2017/12/year_sign/icon_name.png',
            'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2017/12/year_sign/icon_phone.png',
            'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2017/12/year_sign/page04_text_wkh.png',
            'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2017/12/year_sign/page04_text_ykh.png',
            'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2017/12/year_sign/page04_text_lqlyts.png',
            'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2017/12/year_sign/page04_giftbox.png',
            'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2017/12/year_sign/page04_giftbox_open.png',
            'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2017/12/year_sign/page05_giftbox_open_fail.png',
            'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2017/12/year_sign/step01.png',
            'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2017/12/year_sign/step02.png',
            'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2017/12/year_sign/step03.png',
            'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2017/12/year_sign/step02_sign.png',
            'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2017/12/year_sign/step02_text.png',
            'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2017/12/year_sign/step03_giftbox.png',
            'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2017/12/year_sign/step03_texts.png',
            'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2017/12/year_sign/signflow_bg01_new.jpg',
            'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2017/12/year_sign/signflow_bg02_new.jpg',
            'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2017/12/year_sign/signflow_bg03_new.jpg',
        ],
    },
    mounted: function () {
        var self = this;
        self.imgs.forEach(function (url) {
            var img = new Image();
            img.onload = function () {
                self.count += 1;
            };
            img.src = url;
        });
    },
    watch: {
        count: function (val) {
            var self = this,
                per = val / self.imgs.length;
            self.process_percent = Math.floor(per * 100);
            if (per === 1) {
                setTimeout(function () {
                    self.progress = false;
                }, 1000);
            }
        },
    },
}).$mount('#app');

/**
 * 热模块替换，开发环境使用
 */
if (module.hot) {
    module.hot.accept();
}

/**
 * Created by LHammer on 18/03/30.
 * ES6 version
 * @class wechat share
 */
import wx from 'weixin-js-sdk';
/**
 * 微信分享接口
 * @param {Object} data 页面配置信息
 * @param {Object} data 分享内容（标题、描述、图标、链接）
 */
export default {
    setConfig() {
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            // appId: data.appid, // 必填，公众号的唯一标识
            // timestamp: data.timestamp, // 必填，生成签名的时间戳
            // nonceStr: data.noncestr, // 必填，生成签名的随机串
            // signature: data.signature, // 必填，签名
            appId: '<{$ticket.appid}>', // 必填，公众号的唯一标识
            timestamp: '<{$ticket.timestamp}>', // 必填，生成签名的时间戳
            nonceStr: '<{$ticket.noncestr}>', // 必填，生成签名的随机串
            signature: '<{$ticket.signature}>', // 必填，签名
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone'], // 必填，需要使用的JS接口列表
        });
    },
    init(share) {
        wx.ready(() => {
            wx.checkJsApi({
                // 检测是否支持分享的接口
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone'],
                success() {
                    /**
                     * 发送给朋友
                     */
                    wx.onMenuShareAppMessage({
                        title: share.title, // 分享标题
                        desc: share.desc, // 分享描述
                        link: share.url, // 分享链接
                        imgUrl: share.imgUrl, // 分享图标
                        type: 'link', // 分享类型,music、video或link，不填默认为link
                        // 用户确认分享后执行的回调函数
                        success() {},

                        // 用户取消分享后执行的回调函数
                        cancel() {},
                    });
                    /**
                     * 分享到朋友圈
                     */
                    wx.onMenuShareTimeline({
                        title: share.title, // 分享标题
                        link: share.url, // 分享链接
                        imgUrl: share.imgUrl, // 分享图标
                        // 用户确认分享后执行的回调函数
                        success() {},

                        // 用户取消分享后执行的回调函数
                        cancel() {},
                    });
                    /**
                     * 分享到手机QQ
                     */
                    wx.onMenuShareQQ({
                        title: share.title, // 分享标题
                        desc: share.desc, // 分享描述
                        link: share.url, // 分享链接
                        imgUrl: share.imgUrl, // 分享图标
                        // 用户确认分享后执行的回调函数
                        success() {},

                        // 用户取消分享后执行的回调函数
                        cancel() {},
                    });
                    /**
                     * 分享到QQ空间
                     */
                    wx.onMenuShareQZone({
                        title: share.title, // 分享标题
                        desc: share.desc, // 分享描述
                        link: share.url, // 分享链接
                        imgUrl: share.imgUrl, // 分享图标
                        // 用户确认分享后执行的回调函数
                        success() {},

                        // 用户取消分享后执行的回调函数
                        cancel() {},
                    });
                },
            });
        });
    },
    /**
     * config信息验证失败会执行error函数;
     * 如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
     */
    error() {
        wx.error((res) => {
            console.log(res);
        });
    },
};

/**
 * e.g.
 */
// import wxShare from '../utils/es5/wxShare';
// const shareData = {
//     title: '冲刺百亿大放送 奖励上不封顶', // 分享标题
//     desc: '手速越快金额越高~快来看看你能拿多少', // 分享描述
//     link: '<{$share_url}>', // 分享链接
//     imgUrl: 'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/03/tenBilRedPacket/share-icon.png', // 分享图标
// };
// wxShare.setConfig();
// wxShare.init(shareData);

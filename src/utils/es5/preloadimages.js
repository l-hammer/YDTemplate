/**
 * Created by LHammer on 18/03/07.
 * ES5 version
 * @function preloadimages 图片预加载
 */
var preloadimages,
    $count = 0,
    $cacheImgs = [],
    $imgs = [
        'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/01/new_year_market/page-1-1s.jpg',
        'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/01/new_year_market/girl-gomarket-sprites-min.png',
        'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/01/new_year_market/page-1-2.png',
        'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/01/new_year_market/page-2-1ss.jpg',
        'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/01/new_year_market/page-2-2s.png',
        'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/01/new_year_market/page-2-3.png',
        'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/01/new_year_market/page-2-4.png',
        'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/01/new_year_market/page-2-4-mask.png',
        'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/01/new_year_market/page-2-3-mask.png',
        'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/01/new_year_market/page-3-1s.jpg',
        'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/01/new_year_market/page-3-3.png',
        'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/01/new_year_market/page-3-4.png',
        'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/01/new_year_market/page-4-1s.jpg',
        'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/01/new_year_market/dialog-1.png',
        'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/01/new_year_market/dialog-2.png',
    ];

/**
 * 预加载+vue.$watch简单实现
 */
$imgs.forEach(function (url, idx) {
    $cacheImgs[idx] = new Image();
    $cacheImgs[idx].onload = function () {
        $count += 1;
        Math.floor($count / $imgs.length) * 100 + '%'; // 在watch中监听此值的变化
    };
    $cacheImgs[idx].src = url;
});

/**
 * 构造函数实现
 */
function Preloadimages(configs) {
    this.total = this.option.resources.length || 0; // 资源总数
    this.currentIndex = 0; // 当前加载资源索引
    this.option = {
        baseUrl: './',
        resources: [],
        onStart: null,
        onProgress: null,
        onComplete: null,
    };
    if (configs) {
        for (var prop in configs) {
            if ({}.hasOwnProperty.call(prop, configs)) {
                this.option[prop] = configs[prop];
            }
        }
    } else {
        console.error('参数错误');
        return;
    }
    function isFunction(fn) {
        return Object.prototype.toString.call(fn) === '[object Function]';
    }
    this.start = function () {
        var _url,
            cacheImage = [],
            self = this;
        if (isFunction(self.option.onStart)) {
            self.option.onStart();
        }
        self.resources.forEach(function (url, idx) {
            if (url.indexOf('https://') === 0 || url.indexOf('http://') === 0) {
                _url = url;
            } else {
                _url = self.option.baseUrl + url;
            }
            cacheImage[idx] = new Image();
            cacheImage[idx].onload = function () {
                self.loaded();
            };
            cacheImage[idx].onerror = function () {
                self.loaded();
                console.error('图片路径' + _url + '错误');
            };
            cacheImage[idx].src = _url;
        });
    };
    this.loaded = function () {
        if (this.currentIndex !== this.total) {
            this.currentIndex += 1;
            if (isFunction(this.option.onProgress)) {
                this.option.onProgress(this.currentIndex, this.total);
            }
        } else if (isFunction(this.option.onComplete)) {
            this.option.onComplete(this.total);
        }
    };
}

/**
 * e.g.
 * @param {resources|Array} 图片资源
 * @param {onStart|Function} 加载开始回调
 * @param {onProgress|Function} 正在加载回调，回传参数currentIndex, total
 * @param {onComplete|Function} 加载完成回调
 */
preloadimages = new Preloadimages({
    resources: $imgs,
    onStart: function () {
        console.log('loading 0%');
    },
    onProgress: function (current, total) {
        console.log('loading ' + Math.floor(current / total.length) * 100 + '%');
    },
    onComplete: function () {
        console.log('加载完毕~');
    },
});
preloadimages.start();

/**
 * Created by LHammer on 18/03/07.
 * ES6 version
 * @function preloadimages 图片预加载
 */
class Preloadimages {
  constructor(configs) {
    this.total = this.option.resources.length || 0; // 资源总数
    this.currentIndex = 0; // 当前加载资源索引
    this.option = {
      baseUrl: './', // 资源基准url, 默认'./'
      resources: [], // 图片资源
      onStart: null, // 加载开始回调
      onProgress: null, // 正在加载回调，回传参数currentIndex, total
      onComplete: null, // 加载完成回调
    };
    if (configs) {
      for (const prop in configs) {
        if ({}.hasOwnProperty.call(prop, configs)) {
          this.option[prop] = configs[prop];
        }
      }
    } else {
      throw new Error('参数错误');
    }
    this.isFunction = fn => Object.prototype.toString.call(fn) === '[object Function]';
  }
  start() {
    let _url;
    const cacheImage = [];
    const self = this;
    if (this.isFunction(this.option.onStart)) {
      this.option.onStart();
    }
    this.resources.forEach((url, idx) => {
      if (url.indexOf('https://') === 0 || url.indexOf('http://') === 0) {
        _url = url;
      } else {
        _url = this.option.baseUrl + url;
      }
      cacheImage[idx] = new Image();
      cacheImage[idx].onload = () => {
        self.loaded();
      };
      cacheImage[idx].onerror = () => {
        self.loaded();
        throw new Error('图片路径' + _url + '错误');
      };
      cacheImage[idx].src = _url;
    });
  }
  loaded() {
    if (this.currentIndex !== this.total) {
      this.currentIndex += 1;
      if (this.isFunction(this.option.onProgress)) {
        this.option.onProgress(this.currentIndex, this.total);
      }
    } else if (this.isFunction(this.option.onComplete)) {
      this.option.onComplete(this.total);
    }
  }
}

/**
 * e.g.
 * @param {baseUrl|String} 资源基准url, 默认'./'
 * @param {resources|Array} 图片资源
 * @param {onStart|Function} 加载开始回调
 * @param {onProgress|Function} 正在加载回调，回传参数currentIndex, total
 * @param {onComplete|Function} 加载完成回调
 */
const $imgs = [
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
const preloadimages = new Preloadimages({
  resources: $imgs,
  onStart() {
    console.log('loading 0%');
  },
  onProgress(current, total) {
    console.log(`loading ${Math.floor(current / total.length) * 100}%`);
  },
  onComplete() {
    console.log('加载完毕~');
  },
});
preloadimages.start();

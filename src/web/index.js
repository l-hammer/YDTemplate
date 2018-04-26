
/**
 * 上线时拷贝dist目录下生成的样式，并在./template.tpl引入对应脚本
 */
import $ from 'jquery';
import '../assets/web.scss';

/**
 * 开发JS,上线直接拷贝一下内容到./template.tpl
 * this is a mark line(以此线为标准，autocopy脚本会自动拷贝其之后的代码，请勿删除)
 */
var YD = {},
  template;

YD.Template = function () {
  /** 变量 */
  this.$isLogin = $('#isLogin').val();

  /** 初始化 */
  this.init = function () {
    this.events();
  };

  this.events = function () {
    /** 事件方法 */
    console.log(this);
  };
};

template = new YD.Template();
template.init();

/**
 * 热模块替换，开发环境使用
 */
if (module.hot) {
  module.hot.accept();
}

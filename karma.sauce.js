var sauce = require('./sauce.json'); // 引进 userName 和 key
// 生成一个 SauceLabs 浏览器配置信息，可以指定运行的系统和浏览器版本
function createCustomLauncher(browser, platform, version) {
    return {
        base: 'SauceLabs',
        browserName: browser,
        platform: platform,
        version: version
    };
}
// 定义所有需要在云端测试的平台和浏览器
// 名字的定义是随意的，SauceLabs 只会根据配置内容来启动对应的浏览器
// 所有完整的平台设备列表：https://saucelabs.com/platforms
var customLaunchers = {
    // Modern browsers
    sl_win_chrome: createCustomLauncher('chrome', 'Windows 7'),
    sl_mac_chrome: createCustomLauncher('chrome', 'OS X 10.10'),

    sl_win_firefox: createCustomLauncher('firefox', 'Windows 7'),
    sl_mac_firefox: createCustomLauncher('firefox', 'OS X 10.10'),

    sl_mac_safari: createCustomLauncher('safari', 'OS X 10.11'),

    // Mobile side
    sl_ios_8_safari: createCustomLauncher('iphone', null, '8.4'),
    sl_ios_9_safari: createCustomLauncher('iphone', null, '9.3'),
    sl_android_4_2: createCustomLauncher('android', null, '4.2'),
    sl_android_5_1: createCustomLauncher('android', null, '5.1'),

    // Microsoft Edge
    sl_edge: createCustomLauncher('MicrosoftEdge', 'Windows 10'),

    // Internet explorer
    sl_ie_9: createCustomLauncher('internet explorer', 'Windows 7', '9'),
    sl_ie_10: createCustomLauncher('internet explorer', 'Windows 8', '10'),
    sl_ie_11: createCustomLauncher('internet explorer', 'Windows 10', '11')

};
// Karma 配置参数
// https://karma-runner.github.io/1.0/config/configuration-file.html
module.exports = function (KarmaConfig) {
    // 将 SauceLabs 提供的 username 和 accesskey 放到环境变量中
    if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
        process.env.SAUCE_USERNAME = sauce.username;
        process.env.SAUCE_ACCESS_KEY = sauce.accesskey;
    }
    console.log(process.env);
    // 设置测试的超时时间
    var maxExecuteTime = 5 * 60 * 1000;
    KarmaConfig.set({
        // 加载测试文件的根目录
        basePath: '',
        // 使用的断言库
        frameworks: ['jasmine'],
        // 告诉 Karma 要将哪些 js 文件加载到浏览器运行测试
        files: [
            './test/unit/*.spec.js'
        ],
        // SauceLabs 的配置，这里只需要配置几个重要的字段即可，完整的字段可以参考：
        // https://wiki.saucelabs.com/display/DOCS/Test+Configuration+Options
        sauceLabs: {
            // 测试结果是否公开，如果希望生成矩阵图，必须是 public
            public: 'public',
            // 是否在测试过程记录虚拟机的运行录像
            recordVideo: false,
            // 是否在测试过程记录虚拟机的图像
            recordScreenshots: false,
            // 测试名称
            testName: 'Cross browsers test',
            // 测试的记录号，可以为任意字符，如果希望生成矩阵图，build 不能为空
            build: 'build-' + Date.now()
        },
        // 自定义运行测试的 SauceLabs 浏览器
        // customLaunchers: customLaunchers,
        // browsers: Object.keys(customLaunchers),
        browsers: ['Chrome'],
        // 测试处理的报告程序
        reporters: ['progress', 'saucelabs'],
        // 最大超时时间
        captureTimeout: maxExecuteTime,
        browserNoActivityTimeout: maxExecuteTime
    });
}
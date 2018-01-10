
<br><br>
<p align="center">
  	<a href="https://getbootstrap.com/">
        <i style="font-size: 69px;">📄</i>
  	</a>
	<h3 align="center">YDTemplate</h3>
	<p align="center">
		Yindou Web and App special development template~
		<br>
	</p>
</p>

## Quick start

Several quick start options are available:

- Clone the repo: `https://github.com/l-hammer/YDTemplate.git`
- Install dependencies with [npm](https://www.npmjs.com/): `npm install`
- Web development Run `npm run webdev`
- App development Run `npm run appdev`
- Open `http://localhost:9001` in your browser.

## What's included

```
YDTemplate/
├── src/
│   ├── assets/
│   │   ├── normalize/
│   │   │   └── index.scss    //统一浏览器默认样式
│   │   ├── animation/
│   │   │   └── index.scss    //css动画
│   │   ├── mixins/
│   │   │   └── index.scss    //可重用的代码块@mixin
│   │   ├── app.scss    //app开发样式入口
│   │   └── web.scss    //web开发样式入口
│   ├── app/
│   │   ├── index.html    //app开发页
│   │   ├── index.js    //app开发脚本
│   │   └──template.tpl    //上线模板
│   └── web/
│       ├── index.html    //web开发页
│       ├── index.js    //web开发脚本
│       └──template.tpl    //web上线模板
└── .browserslistrc    //支持的浏览器
```
## Technology

App `Vue 2.x` + `Zepto`
Web `Jquery`

## Browser Support

```
last 10 versions
IE 8
iOS 7
```

## Contributing

- Fork it!
- Create your branch: `git checkout -b new-branch`
- Commit your changes: `git commit -am 'Add some feature'`
- Push to the branch: `git push origin new-branch`
- Submit a pull request

/**
 * Created by LHammer on 18/02/27.
 * node proxy
 */
const proxy = require('http-proxy-middleware')
const Bundler = require('parcel-bundler')
const express = require('express')

let proxypath;
const arguments = process.argv.splice(2);
switch (arguments[0]) {
  case 'app':
    proxypath = './src/app/index.html'; break;
  case 'web':
    proxypath = './src/web/index.html'; break;
  case 'appeg':
    proxypath = './src/examples/app/index.html'; break;
  case 'webeg':
    proxypath = './src/examples/web/index.html'; break;
  default: break;
}

let app = express()
let bundler = new Bundler(proxypath)
let port = Number(process.env.PORT || 1234);

app.use(
  '/webapi',
  proxy({
    changeOrigin: true,
    /**
     * 拦截的目标对象
     * @param target -> https://www.yindou.com 线上环境
     * @param target -> http://songhwwww.yind123.com 测试环境
     * @param target -> https://www.easy-mock.com/mock/5a952f51a563ca3b10c483fe/xxxxxx mock环境
     */
    target: 'https://www.easy-mock.com/mock/5a952f51a563ca3b10c483fe/example',
    pathRewrite: { 
      '^/api': '' 
    },
    onProxyReq: function (proxyReq, req, res) {
      /**
       * 订阅http-proxy的proxyReq事件
       * 在转发请求前设置请求头，将PHPSESSID附加到cookie
       * @class https://www.yindou.com -> 'PHPSESSID=n0q2uv73c2v7qd43feag8hntq5'
       * @class http://songhwwww.yind123.com/ -> 'PHPSESSID=uitu7f6l86enb81t70iveku2v7'
       */
      proxyReq.setHeader('cookie', 'PHPSESSID=uitu7f6l86enb81t70iveku2v7');
      // for (let prop of Object.getOwnPropertySymbols(proxyReq)) {
      //   console.log(proxyReq[prop]);  
      // }
    },
  })
)

const feedback = 'Interested in YDTemplate? Help me improve by sharing your feedback.';
const github = 'https://github.com/l-hammer/YDTemplate';
console.log(`\n\x1B[35m${feedback}\x1B[22m\x1B[39m\n\x1B[34m${github}\x1B[0m\n`);

app.use(bundler.middleware())
app.listen(port, () => {
  console.log(`Server running at \x1B[36mhttp://localhost:${port}\x1B[0m\n`);
})

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

let bundler = new Bundler(proxypath)
let app = express()

app.use(
  '/webapi',
  proxy({
    changeOrigin: true,
    target: 'http://songhwwww.yind123.com/',
    pathRewrite: { 
      '^/api': '' 
    },
    onProxyReq: function (proxyReq, req, res) {
      proxyReq.setHeader('cookie', 'UM_distinctid=15f57d1509446b-0552480959efeb-18396d56-13c680-15f57d15095916; _kela_guide=ok; gr_user_id=58776851-79b8-42fe-9bd2-2c94215dacc2; get_str=%7B%22%5C%2Findex_php5%22%3A%22%22%2C%22zhaiquangoumai%5C%2F500183_html%22%3A%22%22%7D; PHPSESSID=t3bhat3dr45n24mkrif1oghlv4; Hm_lvt_de72ed30dc21da8d5dcf608850a7aaac=1517884748,1519626678; CNZZDATA1260321659=1026547113-1509006554-null%7C1519635577; yd_username=11101234999; gr_session_id_b9a32bc6f5df5804=ff662ac5-110c-4e2a-9ffc-d8bbaf0b6576; Hm_lpvt_de72ed30dc21da8d5dcf608850a7aaac=1519720959');
    },
  })
)

app.use(bundler.middleware())
app.listen(Number(process.env.PORT || 1234))
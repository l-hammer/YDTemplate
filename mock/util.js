/**
 * Created by LHammer on 18/05/03.
 * 注册 mock api
 */
const Mock = require('mockjs');
const data = require('./data.json');
const express = require('express');
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

/**
 * @name getGameInfo api
 * @param {String} invitation_id 邀请id
 */
app.post('/getGameInfo', function (req, res) {
  const ivid = req.body.invitation_id;
  const cont = ivid ? data.gamePkInfo : data.gameInfo
  res.json(Mock.mock(cont))
})

/**
 * @name shakeNum api
 * @param {String} act master_num: 邀请人摇数；slave_num: 被邀请人摇数；list: 奖金列表
 * @param {String} invitation_id 邀请人加密id
 * @param {String} open_id 微信open_id
 */
app.post('/shakeNum', function (req, res) {
  const act = req.body.act;
  switch (act) {
    case 'master_num':
      res.json(Mock.mock(data.shakeNum))
      break;
    case 'slave_num':
      res.json(Mock.mock(data.shakePkNum))
      break;
    case 'list':
      res.json(Mock.mock(data.list))
      break;
  }
})

module.exports = app;
/**
 * Created by LHammer on 18/05/03.
 * 注册 mock api
 */
const Mock = require('mockjs');
const data = require('./data.json');
const express = require('express');

const router = express.Router();

// 接口名称:/getLoanInfo
router.all('/getLoanInfo', function (req, res) {
  res.json(Mock.mock(data.loanInfo));
});

// 接口名称:/getCash
router.all('/getCash', function (req, res) {
  res.json(Mock.mock(data.cashs));
});

module.exports = router;
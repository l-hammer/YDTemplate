/**
 * Created by LHammer on 18/03/07.
 * ES5 version
 * @class date parse or format date
 */
(function (main) {
  var date = {},
    formatFlags = {},
    parseFlags = {},
    twoDigits = /\d\d?/,
    fourDigits = /\d{4}/,
    token = /d{1,2}|M{1,2}|yy(?:yy)?|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g;

  function pad(val, len) {
    val = String(val);
    len = len || 2;
    while (val.length < len) {
      val = '0' + val;
    }
    return val;
  }

  formatFlags = {
    yyyy: function (dateObj) {
      return pad(dateObj.getFullYear(), 4);
    },
    yy: function (dateObj) {
      return String(dateObj.getFullYear()).substr(2);
    },
    M: function (dateObj) {
      return dateObj.getMonth() + 1;
    },
    MM: function (dateObj) {
      return pad(dateObj.getMonth() + 1);
    },
    d: function (dateObj) {
      return dateObj.getDate();
    },
    dd: function (dateObj) {
      return pad(dateObj.getDate());
    },
    h: function (dateObj) {
      return dateObj.getHours() % 12 || 12;
    },
    hh: function (dateObj) {
      return pad(dateObj.getHours() % 12 || 12);
    },
    H: function (dateObj) {
      return dateObj.getHours();
    },
    HH: function (dateObj) {
      return pad(dateObj.getHours());
    },
    m: function (dateObj) {
      return dateObj.getMinutes();
    },
    mm: function (dateObj) {
      return pad(dateObj.getMinutes());
    },
    s: function (dateObj) {
      return dateObj.getSeconds();
    },
    ss: function (dateObj) {
      return pad(dateObj.getSeconds());
    },
  };

  date.masks = {
    default: 'yyyy-MM-dd HH:mm:ss',
    date: 'yyyy-MM-dd',
    datetime: 'yyyy-MM-dd HH:mm:ss',
    time: 'HH:mm:ss',
    year: 'yyyy',
    enDate: 'M/d/yy',
    cnDate: 'yyyy 年 MM 月 dd 日',
  };

  /**
   * Format a date
   * @method format
   * @param {Date|number} dateObj
   * @param {String} mask Format of the date
   */
  date.format = function (dateObj, mask) {
    if (typeof dateObj === 'number') {
      dateObj = new Date(dateObj);
    }

    if (Object.prototype.toString.call(dateObj) !== '[object Date]' || isNaN(dateObj.getTime())) {
      throw new Error('Invalid Date in date.format');
    }

    mask = date.masks[mask] || mask || date.masks.default;

    mask = mask.replace(token, function ($0) {
      return $0 in formatFlags ? formatFlags[$0](dateObj) : $0.slice(1, $0.length - 1);
    });

    return mask;
  };

  parseFlags = {
    yyyy: [fourDigits, function (d, v) {
      d.year = v;
    }],
    yy: [twoDigits, function (d, v) {
      var da = new Date(),
        cent = +('' + da.getFullYear()).substr(0, 2);
      d.year = '' + (v > 68 ? cent - 1 : cent) + v;
    }],
    M: [twoDigits, function (d, v) {
      d.month = v - 1;
    }],
    d: [twoDigits, function (d, v) {
      d.day = v;
    }],
    h: [twoDigits, function (d, v) {
      d.hour = v;
    }],
    m: [twoDigits, function (d, v) {
      d.minute = v;
    }],
    s: [twoDigits, function (d, v) {
      d.second = v;
    }],
  };
  parseFlags.MM = parseFlags.M;
  parseFlags.dd = parseFlags.d;
  parseFlags.hh = parseFlags.h;
  parseFlags.H = parseFlags.h;
  parseFlags.HH = parseFlags.h;
  parseFlags.mm = parseFlags.m;
  parseFlags.ss = parseFlags.s;

  /**
   * Format a date
   * @method parse
   * @param {String} dateStr Date String e.g. '2018-02-09 09:29:29' or '2018 年 02 月 09 日'
   * @param {String} mask Parse of the format date e.g. 'yyyy-MM-dd HH:mm:ss' or 'cnDate'
   * @param {Date}
   */
  date.parse = function (dateStr, mask) {
    var isVaild = true,
      dateInfo = {},
      today = new Date();

    if (typeof dateStr !== 'string') {
      throw new Error('Invalid format in date.parse');
    }

    mask = date.masks[mask] || mask || date.masks.default;
    /**
     * @function replace @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace;
     * @param {String} $0 匹配的子串
     */
    mask.replace(token, function ($0) {
      if (parseFlags[$0]) {
        /**
         * 搜索匹配到子串(e.g. yyyy)对应flag(fourDigits)的位置
         * @function search 未匹配到时返回-1，即按位取反为0时表示没有对应的flag
         */
        var flag = parseFlags[$0],
          index = dateStr.search(flag[0]);
        if (!~index) {
          isVaild = false;
        } else {
          /**
           * 为避免重复返回，将已经返回的值result从dateStr中删除
           */
          dateStr.replace(flag[0], function (result) {
            flag[1](dateInfo, result);
            dateStr = dateStr.substr(index + result.length);
            return result;
          });
        }
      }
      return parseFlags[$0] ? '' : $0.slice(1, $0.length - 1);
    });

    if (!isVaild) {
      return false;
    }

    return new Date(
      dateInfo.year || today.getFullYear(),
      dateInfo.month || 0,
      dateInfo.day || 1,
      dateInfo.hour || 0,
      dateInfo.minute || 0,
      dateInfo.second || 0,
    );
  };

  /**
   * Module exports
   */
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = date;
  } else if (typeof define === 'function' && define.amd) {
    define(function () {
      return date;
    });
  } else {
    main.date = date;
  }
})(this);

/**
 * e.g.
 *
 * @requires import date from '../utils/es6/date';
 *
 * @example date.format(new Date());
 * @returns 2018-03-09 00:00:00 // 默认格式
 *
 * @example date.format(new Date(), 'yyyy-MM-dd');
 * @returns 2018-03-09
 *
 * @example date.format(new Date(2018, 1, 9), 'yyyy 年 MM 月 dd 日');
 * @returns 2018 年 03 月 09 日
 *
 * @example date.parse('2018-02-09 09:29:29');
 * @returns Fri Feb 09 2018 09:29:29 GMT+0800 (CST) // 默认格式，等同于'yyyy-MM-dd HH:mm:ss'
 *
 * @example date.parse('2018-02-09 09:29:29', 'yyyy-MM-dd HH:mm:ss');
 * @returns Fri Feb 09 2018 09:29:29 GMT+0800 (CST)
 *
 * @example date.parse('2018 年 02 月 09 日', 'cnDate');
 * @returns Fri Feb 09 2018 00:00:00 GMT+0800 (CST)
 */

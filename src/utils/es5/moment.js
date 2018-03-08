/**
 * Created by LHammer on 18/03/07.
 * ES5 version
 * @class moment parse or format dates
 */
(function (main) {
    var moment = {},
        formatFlags = {},
        literal = /\[([^]*?)\]/gm,
        token = /d{1,2}|M{1,2}|yy(?:yy)?|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g;

    moment.i18n = {
        dayNames: [],
        weeks: {
            sun: '日',
            mon: '一',
            tue: '二',
            wed: '三',
            thu: '四',
            fri: '五',
            sat: '六',
        },
        monthNames: {
            jan: '一月',
            feb: '二月',
            mar: '三月',
            apr: '四月',
            may: '五月',
            jun: '六月',
            jul: '七月',
            aug: '八月',
            sep: '九月',
            oct: '十月',
            nov: '十一月',
            dec: '十二月',
        },
        amPm: ['am', 'pm'],
    };

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
            return dateObj.getDay();
        },
        dd: function (dateObj) {
            return pad(dateObj.getDay());
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
        a: function (dateObj, i18n) {
            return dateObj.getHours() < 12 ? i18n.amPm[0] : i18n.amPm[1];
        },
        A: function (dateObj, i18n) {
            return dateObj.getHours() < 12 ? i18n.amPm[0].toUpperCase() : i18n.amPm[1].toUpperCase();
        },
    };

    moment.masks = {
        default: 'yyyy-MM-dd HH:mm:ss',
        enShortDate: 'M/d/yy',
        date: 'yyyy-MM-dd',
        datetime: 'yyyy-MM-dd HH:mm:ss',
        time: 'HH:mm:ss',
        daterange: 'yyyy-MM-dd',
        datetimerange: 'yyyy-MM-dd HH:mm:ss',
        timerange: 'HH:mm:ss',
        year: 'yyyy',
    };

    /**
     * Format a date
     * @method format
     * @param {Date|number} dateObj
     * @param {String} mask Format of the date
     * @param {i18nSettings}
     */
    moment.format = function (dateObj, mask, i18nSettings) {
        var i18n = i18nSettings || moment.i18n,
            literals = [];

        if (typeof dateObj === 'number') {
            dateObj = new Date(dateObj);
        }

        if (Object.prototype.toString.call(dateObj) !== '[object Date]' || isNaN(dateObj.getTime())) {
            throw new Error('Invalid Date in moment.format');
        }

        mask = moment.masks[mask] || mask || moment.masks.default;

        mask = mask.replace(literal, function ($0, $1) {
            literals.push($1);
            return '??';
        });

        mask = mask.replace(token, function ($0) {
            return $0 in formatFlags ? formatFlags[$0](dateObj, i18n) : $0.slice(1, $0.length - 1);
        });

        return mask.replace(/\?\?/g, function () {
            return literals.shift();
        });
    };

    /**
     * Module exports
     */
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = moment;
    } else if (typeof define === 'function' && define.amd) {
        define(function () {
            return moment;
        });
    } else {
        main.moment = moment;
    }
})(this);

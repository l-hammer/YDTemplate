/**
 * Created by LHammer on 18/03/07.
 * ES6 version
 * @class moment parse or format dates
 */
const literal = /\[([^]*?)\]/gm;
const token = /d{1,2}|M{1,2}|yy(?:yy)?|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g;

const moment = {
    i18n: {
        amPm: ['am', 'pm'],
    },
    masks: {
        default: 'yyyy-MM-dd HH:mm:ss',
        enShortDate: 'M/d/yy',
        date: 'yyyy-MM-dd',
        datetime: 'yyyy-MM-dd HH:mm:ss',
        time: 'HH:mm:ss',
        daterange: 'yyyy-MM-dd',
        datetimerange: 'yyyy-MM-dd HH:mm:ss',
        timerange: 'HH:mm:ss',
        year: 'yyyy',
    },
};

const pad = (val, len) => {
    val = String(val);
    len = len || 2;
    while (val.length < len) {
        val = `0${val}`;
    }
    return val;
};

const formatFlags = {
    yyyy(dateObj) {
        return pad(dateObj.getFullYear(), 4);
    },
    yy(dateObj) {
        return String(dateObj.getFullYear()).substr(2);
    },
    M(dateObj) {
        return dateObj.getMonth() + 1;
    },
    MM(dateObj) {
        return pad(dateObj.getMonth() + 1);
    },
    d(dateObj) {
        return dateObj.getDay();
    },
    dd(dateObj) {
        return pad(dateObj.getDay());
    },
    h(dateObj) {
        return dateObj.getHours() % 12 || 12;
    },
    hh(dateObj) {
        return pad(dateObj.getHours() % 12 || 12);
    },
    H(dateObj) {
        return dateObj.getHours();
    },
    HH(dateObj) {
        return pad(dateObj.getHours());
    },
    m(dateObj) {
        return dateObj.getMinutes();
    },
    mm(dateObj) {
        return pad(dateObj.getMinutes());
    },
    s(dateObj) {
        return dateObj.getSeconds();
    },
    ss(dateObj) {
        return pad(dateObj.getSeconds());
    },
    a(dateObj, i18n) {
        return dateObj.getHours() < 12 ? i18n.amPm[0] : i18n.amPm[1];
    },
    A(dateObj, i18n) {
        return dateObj.getHours() < 12 ? i18n.amPm[0].toUpperCase() : i18n.amPm[1].toUpperCase();
    },
};

export const format = (dateObj, mask, i18nSettings) => {
    /**
     * Format a date
     * @method format
     * @param {Date|number} dateObj
     * @param {String} mask Format of the date
     * @param {i18nSettings}
     */
    var literals = [];
    const i18n = i18nSettings || moment.i18n;

    if (typeof dateObj === 'number') {
        dateObj = new Date(dateObj);
    }

    if (Object.prototype.toString.call(dateObj) !== '[object Date]' || isNaN(dateObj.getTime())) {
        throw new Error('Invalid Date in moment.format');
    }
    mask = moment.masks[mask] || mask || moment.masks.default;

    mask = mask.replace(literal, ($0, $1) => {
        literals.push($1);
        return '??';
    });
    // return 不可省略
    mask = mask.replace(token, ($0) => {
        return $0 in formatFlags ? formatFlags[$0](dateObj, i18n) : $0.slice(1, $0.length - 1);
    });

    return mask.replace(/\?\?/g, () => literals.shift());
};

export const parse = () => {};

export default {
    format,
    parse,
};

/**
 * e.g.
 * @returns yyyy-MM-dd
 * @requires import { format } from '../utils/es6/moment';
 * @example format(new Date(), 'yyyy-MM-dd');
 */

/**
 * e.g. 默认导出
 * @returns yyyy-MM-dd
 * @requires import moment from '../utils/es6/moment';
 * @example moment.format(new Date(), 'yyyy-MM-dd');
 */

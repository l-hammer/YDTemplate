/**
 * Created by LHammer on 18/03/07.
 * ES5 version
 * @function scrollToTop 返回顶部
 */

var $ = 'jquery',
    scrollToTop;

scrollToTop = function () {
    $(window).scrollTop() === 0 ? null : ($('html, body').stop(true).animate({ scrollTop: 0 }, 600));
};
// 滚动时高亮指定悬浮导航
$(window).scroll(function () {
    var i,
        d = 589,
        wst = $(window).scrollTop(),
        wstmid = wst + ($(window).height() / 2);
    if (wst > d) {
        $('.float_menu').fadeIn();
    } else {
        $('.float_menu').fadeOut();
    }
    for (i = 2; i < 5; i++) {
        if ($('#floor' + i).offset().top <= wstmid) {
            $('.menu_item').removeClass('active');
            $('a[href="#floor' + i + '"]').addClass('active');
        }
    }
});

/**
 * e.g.
 */
scrollToTop();

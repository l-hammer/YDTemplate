/**
 * Created by LHammer on 18/03/07.
 * ES6 version
 * @function scrollToTop 返回顶部
 */
const scrollToTop = () => {
  const d = document.documentElement.scrollTop || document.body.scrollTop;
  if (d > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, d - (d / 8));
  }
};

export default scrollToTop;

/**
 * e.g.
 */
scrollToTop();

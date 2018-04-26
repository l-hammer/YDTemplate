/**
 * 普通指令 v-
 * @param {String} attr 属性
 */
export function isDirective(attr) {
  return attr.indexOf('v-') === 0;
}

/**
 * 事件指令 v-on:click
 * @param {String} dir v-on:click
 */
export function isEventDirective(dir) {
  return dir.indexOf('on:') === 0;
}

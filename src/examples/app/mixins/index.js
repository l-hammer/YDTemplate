/**
 * @mixin arrayPull 删除数组指定元素（一个或多个）
 */
import initArr from '../../../utils/es6/initArrayWithRange';
import shuffle from '../../../utils/es6/shuffleArray';
import arrayPull from '../../../utils/es6/arrayPull';

export default {
  data() {
    return {
      shuffleArr: [],
    };
  },
  mounted() {
    const range = initArr(9, 1);
    this.shuffleArr = shuffle(range);
  },
  methods: {
    arrayPull,
    openDialog(name) {
      this.dialogs[name].open = true;
    },
    closeDialog(name) {
      this.dialogs[name].open = false;
    },
  },
};

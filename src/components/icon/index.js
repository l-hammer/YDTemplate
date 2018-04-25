import Icon from './icon.vue';

Icon.install = function (Vue) {
    console.log(Icon);
    Vue.component(Icon.name, Icon);
};

export default Icon;

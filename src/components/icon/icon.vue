<template>
  <i
    :class="classes"
    :style="styles">
  </i>
</template>

<script>
const prefixCls = 'yds-icon';
export default {
    name: 'Icon',
    props: {
        name: {
            type: String,
            required: true,
        },
        size: {
            type: Number,
            default: 12,
            required: false,
        },
        color: {
            type: String,
            default: '',
            required: false,
        },
    },
    computed: {
        classes() {
            return `YDSICON ${prefixCls}-${this.name} ft-${this.size}`;
        },
        styles() {
            const style = {};

            if (this.color) {
                style.color = this.color;
            }

            return style;
        },
    },
};
</script>

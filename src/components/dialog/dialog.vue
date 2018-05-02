<template>
  <transition name="dialog-fade">
    <div
      v-show="showDialog"
      class="dialog">
      <div
        class="dialog-mask"
        @click="globalCloseDialog">
      </div>
      <div class="dialog-main">
        <div
          class="dialog-container"
          @click="closeDialog">
          <slot name="main"></slot>
          <slot name="btns"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    name: {
      type: String,
      default: '',
    },
    showDialog: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeDialog() {
      this.$emit('close-dialog', this.name);
    },
    globalCloseDialog(evt) {
      if (evt.target.className.indexOf('mask') !== -1) {
        this.$emit('global-close-dialog');
      }
    },
  },
};
</script>

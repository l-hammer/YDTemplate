/**
 * @mixin openDialog&&closeDialog
 */
export default {
  methods: {
    openDialog(name) {
      this.dialogs[name].open = true;
    },
    closeDialog(name) {
      this.dialogs[name].open = false;
    },
  },
};

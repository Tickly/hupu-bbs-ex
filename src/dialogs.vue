<template>
  <div class="reply-dialog-wrap">
    <hp-dialog
      @close="handleClose(i)"
      v-for="(d,i) in dialogs"
      :key="d.pid"
      :tid="d.tid"
      :pid="d.pid"
    />
  </div>
</template>
<script>
import HpDialog from './dialog.vue'
export default {
  components: {
    HpDialog,
  },
  data() {
    return {
      dialogs: [],
    }
  },
  methods: {
    push(tid, pid) {
      this.dialogs.push({
        tid, pid,
      });
    },
    handleClose(i) {
      this.dialogs.splice(i, 1);
    },

  }
}
</script>

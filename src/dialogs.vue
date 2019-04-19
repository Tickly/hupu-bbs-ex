<template>
  <div class="reply-dialog-wrap">
    <hp-dialog @close="handleClose(i)" v-for="(d,i) in dialogs" :key="d.pid" :tid="d.tid" :pid="d.pid" />
  </div>
</template>
<script>
import HpDialog from './dialog.vue'

export default {
  components: {
    HpDialog,
  },
  data () {
    return {
      dialogs: [],
    }
  },
  methods: {
    push (tid, pid) {
      this.dialogs.push({
        tid, pid,
      });
    },
    handleClose (i) {
      this.dialogs.splice(i, 1);
    },
  },
  watch: {
    'dialogs.length': function (len) {
      let className = 'overflow-hidden'
      if (len > 0) document.documentElement.classList.add(className)
      else document.documentElement.classList.remove(className);
    }
  }
}
</script>

<style lang="less">
.overflow-hidden {
  overflow: hidden;

  .tg-dialog {
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
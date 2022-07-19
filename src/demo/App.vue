<template>
  <div>
    <button class="btn btn-primary" @click="onClick">查看回复</button>

    <reply-view
      v-for="r in DialogProps"
      :key="r.pid"
      :tid="r.tid"
      :pid="r.pid"
    />
  </div>
</template>
<script lang="ts" setup>
import { DialogProps, open } from '@/components/useDialog';
import ReplyView from '@/components/ReplyDialog.vue';

const onClick = () => {
  open('54807408', '149566');
};
</script>

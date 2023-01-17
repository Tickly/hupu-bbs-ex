<template>
  <div>
    <div class="reply-list-avatar">
      <a href="https://my.hupu.com/48984328187712" target="_blank" class="reply-list-avatar-wrapper">
        <div class="lazyload-wrapper">
          <img class="avatar" src="https://i2.hoopchina.com.cn/user/712/48984328187712/48984328187712-1652185199.png@150h_150w_2e" alt="替补首席库里" />
        </div>
      </a>
    </div>
    <button class="btn btn-primary" @click="onClick">查看回复</button>

    <reply-view v-for="r in DialogProps" :key="r.pid" :tid="r.tid" :pid="r.pid" />
  </div>
</template>
<script lang="ts" setup>
import { DialogProps, open } from '@/components/useDialog';
import ReplyView from '@/components/ReplyDialog';

const tid = '57448942'
const pid = '298595'

const onClick = () => {
  open(tid, pid);
};
</script>
<style lang="less">
.reply-list-avatar {
  margin-bottom: 1em;
  img {
    display: block;
    width: 64px;
    height: 64px;
    border: 1px solid black;
    overflow: hidden;
  }
}
</style>

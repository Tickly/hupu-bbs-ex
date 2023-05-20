<template>
  <div class="reply-dialog-list">
    <ReplyDialogVue v-for="r in DialogProps" :key="r.pid" :tid="r.tid" :pid="r.pid" />
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import $ from 'jquery';
import Api, { Reply } from '@/api';
import ReplyDialogVue from '@/components/ReplyDialog';
import { DialogProps, open } from '@/components/useDialog';

// 亮了的回复列表
const lightThreadList = ref<Reply[]>([]);

/**
 * 在每个回复下面生成按钮
 */
const generateButtons = (tid: string) => {
  // 这里默认取第一个
  const $lightContainer = $('.wrapper-container').eq(0);
   

  const list = $lightContainer.find('.post-reply-list-wrapper');

  list.each((i, el) => {

    const $admin = $(el).find('.bbs-admin-reply-post-container');
    const admininfo = $admin.data('admininfo');
    // 取到回帖的id
    const { pid } = admininfo;

    // 从接口拿数据
    const reply = lightThreadList.value.find(t => t.pid === pid);
    // 找不到啥也不干
    if (!reply) return;
    // 没有评论啥也不干
    if (!reply.check_reply_info) return;

    const btnEl = document.createElement('div');
    btnEl.classList.add('todo-list', 'todo-list-reply-dialog');
    const span = document.createElement('span');
    span.classList.add('todo-list-text', 'bold');
    span.innerHTML = `弹框查看评论(${reply.check_reply_info.num})`;
    btnEl.append(span);
    btnEl.addEventListener('click', () => {
      open(tid, pid);
    });

    $(el)
      .find('.post-reply-list-operate')
      .append(btnEl);
  });
};

onMounted(() => {
  // 隐藏帖子
  // $('.post-wrapper').hide();

  // 帖子id
  const [tid] = /(\d)+/.exec(location.pathname) as Array<string>;
  Api.getsThreadLightReplyList(tid).then(res => {
    lightThreadList.value.push(...(res.data.data.list as Reply[]));
    generateButtons(tid);
  });
});
</script>

<template>
  <div class="reply-dialog-list">
    <ReplyDialogVue v-for="r in DialogProps" :key="r.pid" :tid="r.tid" :pid="r.pid" />
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import Api, { Reply } from './api';
import ReplyDialogVue from './components/ReplyDialog';
import { DialogProps, open } from './components/useDialog';
import { analyticsProxyClient } from '@/analytics/sdk';

// 亮了的回复列表
const lightThreadList = ref<Reply[]>([]);

/**
 * 在每个回复下面生成按钮 (纯原生 JS 重写，无 jQuery)
 */
const generateButtons = (tid: string) => {
  // 默认取第一个 .wrapper-container
  const $lightContainer = document.querySelector('.wrapper-container');

  if (!$lightContainer) return;

  // 查询所有回帖容器
  const replyWrappers = $lightContainer.querySelectorAll('.post-reply-list-wrapper');

  replyWrappers.forEach(el => {
    // 找到 .bbs-admin-reply-post-container
    const adminEl = el.querySelector('.bbs-admin-reply-post-container');
    if (!adminEl) return;

    // 从 data-admininfo 属性获取信息
    let admininfo: any = null;
    const admininfoRaw = adminEl.getAttribute('data-admininfo');
    try {
      admininfo = admininfoRaw && JSON.parse(admininfoRaw);
    } catch (e) {
      // 非合法 JSON 可能是 object: 转化为 object 兼容
      if (adminEl instanceof HTMLElement && (admininfoRaw === null || admininfoRaw === undefined)) {
        // 尝试从 dataset 上拿
        // @ts-ignore
        if (adminEl.dataset && adminEl.dataset.admininfo) {
          try {
            admininfo = JSON.parse(adminEl.dataset.admininfo);
          } catch {}
        }
      }
    }

    // 兼容直接 dom.dataset.admininfo 为 object 的情况
    if (typeof admininfo !== 'object' || !admininfo?.pid) {
      // 兼容如果页面是直接 js 写入对象属性
      // @ts-ignore
      if ((adminEl as any).data && (adminEl as any).data.admininfo) {
        admininfo = (adminEl as any).data.admininfo;
      } else {
        return;
      }
    }
    const { pid } = admininfo;

    // 从接口查数据
    const reply = lightThreadList.value.find(t => t.pid === pid);
    if (!reply) return;
    if (!reply.check_reply_info) return;

    // 构造按钮
    const btnEl = document.createElement('div');
    btnEl.classList.add('todo-list', 'todo-list-reply-dialog');
    const span = document.createElement('span');
    span.classList.add('todo-list-text', 'bold');
    span.innerHTML = `弹框查看评论(${reply.check_reply_info.num})`;
    btnEl.append(span);
    btnEl.addEventListener('click', () => {
      handleClick(tid, pid);
    });

    // 挂载到 .post-reply-list-operate
    const operateEl = el.querySelector('.post-reply-list-operate');
    if (operateEl) {
      operateEl.appendChild(btnEl);
    }
  });
};

function handleClick(tid: string, pid: string) {
  open(tid, pid);

  void analyticsProxyClient.reportActive();

}




onMounted(async () => {

  // 帖子id
  const tidMatch = location.pathname.match(/(\d)+/);
  const tid = tidMatch ? tidMatch[0] : '';

  console.log('tid', tid);
  if (!tid) return;

  Api.getsThreadLightReplyList(tid).then(res => {
    lightThreadList.value.push(...(res.data.data.list as Reply[]));
    generateButtons(tid);
  });
});
</script>

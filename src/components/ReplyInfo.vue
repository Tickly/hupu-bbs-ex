<template>
  <div class="reply-info d-flex align-items-start">
    <img class="user-img" :src="ReplyInfo.userImg" :alt="ReplyInfo.userName" @error="onImageError" />
    <div class="flex-grow-1 content-wrap">
      <div class="user-name">{{ ReplyInfo.userName }}</div>
      <div class="time">{{ ReplyInfo.time }}</div>
      <p class="content" ref="contentRef" v-html="ReplyInfo.content"></p>

      <div class="d-flex reply-info-operate">
        <div class="me-3">亮了({{ ReplyInfo.light_count }})</div>
        <span @click="onClick">查看回复({{ ReplyInfo.check_reply_info?.num || 0 }})</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, PropType, ref } from 'vue';
import { Reply } from '@/api';
import defMan from '@/assets/def_man.webp';
import { open } from '@/components/useDialog';

const contentRef = ref<HTMLElement | null>(null);

const props = defineProps({
  tid: {
    type: String,
    required: true,
  },
  ReplyInfo: {
    type: Object as PropType<Reply>,
    required: true,
  },
});

const onImageError = function (e: Event) {
  const el = e.target as HTMLImageElement;
  el.src = defMan;
};

const onClick = () => {
  if (props.ReplyInfo.check_reply_info) {
    if (props.ReplyInfo.check_reply_info.num > 0) {
      open(props.tid, props.ReplyInfo.pid);
    }
  }
};

onMounted(() => {
  const contentEl = contentRef.value as HTMLElement;
  for (const img of contentEl.querySelectorAll('img')) {
    if (img.dataset.src) {
      img.src = img.dataset.src;
      img.dataset.src = '';
    }
    if (img.dataset.gif) {
      img.classList.add('is-gif');
      img.addEventListener('click', function () {
        this.src = this.dataset.gif!;
      });
    }
  }
});
</script>
<style lang="less">
.reply-info {
  .content-wrap {
    border-bottom: 1px solid #ccc;
    padding-bottom: 1rem;
  }

  .user-img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    margin-right: 1em;
  }
  .user-name {
    color: #5c5c5c;
    line-height: 1;
  }
  .time {
    font-size: 10px;
    color: #8c8c8c;
    margin-top: 4px;
    margin-bottom: 1em;
  }

  .content {
    font-size: 16px;
    line-height: 24px;
    color: #000;
    margin-bottom: 1em;

    img {
      // display: block;
      max-width: 100%;
    }

    .lazy-gif {
      position: relative;
      display: inline-flex;
      img {
        cursor: pointer;
      }

      &::after {
        position: absolute;
        display: block;
        padding: 0 4px;
        content: 'GIF';
        color: #fff;
        background-color: #000;
        right: 4px;
        bottom: 4px;
        font-weight: normal;
        pointer-events: none;

        // left: 0;
        // top: 0;
      }
    }
  }

  .reply-info-operate {
    span {
      cursor: pointer;
    }
  }
}
</style>

<template>
  <div
    class="modal reply-view"
    tabindex="-1"
    ref="root"
    data-bs-backdrop="false"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">查看回复</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <ul class="list-group">
            <li class="list-group-item" v-for="r in ReplyList">
              <reply-info-vue :ReplyInfo="r" :tid="tid" />
            </li>
          </ul>
          <div class="text-center text-secondary mt-3 mb-4">没有更多了</div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Modal } from 'bootstrap';
import Api, { Reply } from '@/api';
import ReplyInfoVue from './ReplyInfo.vue';
import { close } from './useDialog';

const props = defineProps({
  /**
   * 帖子id
   */
  tid: {
    type: String,
    required: true,
  },
  /**
   * 回复id
   */
  pid: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['close']);
// import Floor from './floor.vue'

const ReplyList = ref<Reply[]>([]);

const root = ref(null);

onMounted(() => {
  const el = root.value as unknown as HTMLElement;
  const modal = new Modal(el);
  modal.show();

  el.addEventListener('hidden.bs.modal', () => {
    close(props.pid);
  });

  Api.getCheckReply(props.tid as string, props.pid as string).then((res) => {
    ReplyList.value.push(...(res.data.result.list as Reply[]));
  });
});
</script>

<style lang="less">
.reply-view {
  font-family: PingFangSC-Semibold;

  .modal-header {
    border-bottom: none;

    .modal-title {
      font-size: 1.2em;
      font-weight: bold;
    }
  }
  .modal-body {
    padding: 0;
    height: 520px;
    overflow-y: auto;

    .list-group {
      border-radius: 0;
    }

    .list-group-item {
      padding-top: 12px;
      border-bottom: none;
    }
  }
}
</style>

import { defineComponent, h, nextTick, onMounted, ref } from 'vue';
import { Modal } from 'ant-design-vue';
import ReplyItem from './ReplyItem';
import Api, { Reply } from '@/api';
import { close, closeAll, more1, DialogProps } from './useDialog';
import './style.less';

export default defineComponent({
  props: {
    /**
     * 帖子id
     */
    tid: {
      type: String,
      required: true
    },
    /**
     * 回复id
     */
    pid: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const visible = ref(false);
    const loading = ref(true);

    // 查看的回复
    const CurrentReply = ref();

    // 回复列表
    const ReplyList = ref<Reply[]>([]);

    function onClose() {
      visible.value = false;
      nextTick(() => {
        close(props.pid);
      });
    }

    onMounted(() => {
      visible.value = true;

      loading.value = true;
      Api.getCheckReply(props.tid as string, props.pid as string).then(res => {
        loading.value = false;
        const { post_info, list } = res.data.result;
        console.log(post_info, list);
        CurrentReply.value = post_info as Reply;
        ReplyList.value.push(...(list as Reply[]));
      });
    });

    return () => (
      <Modal
        zIndex={DialogProps.value.length + 1000}
        width={800}
        wrapClassName="reply-dialog"
        visible={visible.value}
        mask={false}
        maskClosable={false}
        footer={null}
        closable={false}
        keyboard={true}
        onCancel={onClose}
      >
        <div class="reply-dialog-body">
          {loading.value ? null : (
            <div>
              <ReplyItem isAuthor tid={props.tid} reply={CurrentReply.value} />

              <a-divider />

              {ReplyList.value.map(reply => (
                <ReplyItem tid={props.tid} reply={reply} />
              ))}
            </div>
          )}
        </div>

        <div class="reply-dialog-footer">
          <a-space>
            {more1.value ? (
              <a-button type="primary" onClick={closeAll}>
                关闭全部
              </a-button>
            ) : null}
            <a-button type="primary" onClick={onClose}>
              关闭(Esc)
            </a-button>
          </a-space>
        </div>
      </Modal>
    );
  }
});

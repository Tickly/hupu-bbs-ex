import { defineComponent, onMounted, ref, watch } from 'vue';
import { Modal, Spin, Divider, Space, Button } from 'ant-design-vue';
import 'ant-design-vue/es/modal/style/css';
import 'ant-design-vue/es/spin/style/css';
import 'ant-design-vue/es/divider/style/css';
import 'ant-design-vue/es/space/style/css';
import 'ant-design-vue/es/button/style/css';
import ReplyItem from './ReplyItem';
import Api, { Reply } from '@/api';
import { close, closeAll, more1, DialogProps } from './useDialog';
import { useScrollbar } from './usePerfectScrollbar';
import './style.less';

const Scrollbar = useScrollbar();

export default defineComponent({
  name: 'ReplyModal',
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
    const visible = ref(true);
    const loading = ref(true);

    const modalRef = ref(null);

    // 查看的回复
    const CurrentReply = ref();

    // 回复列表
    const ReplyList = ref<Reply[]>([]);

    function onClose() {
      visible.value = false;
      Scrollbar.unBind();
    }
    function afterClose() {
      close(props.pid);
    }

    onMounted(() => {
      // visible.value = true;
      console.log(modalRef.value);
      if (modalRef.value) {
        const el = modalRef.value as HTMLDivElement;
        Scrollbar.bind(el);
      }

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
        afterClose={afterClose}
        destroyOnClose={true}
        style={{
          left: 'calc(50% - 400px)'
        }}
      >
        <div class="reply-dialog-body" ref={modalRef}>
          {loading.value ? (
            <div class="is-loading">
              <Spin tip="正在获取回复列表..." />
            </div>
          ) : (
            <div>
              <ReplyItem isAuthor tid={props.tid} reply={CurrentReply.value} />

              <Divider />

              {ReplyList.value.map(reply => (
                <ReplyItem tid={props.tid} reply={reply} />
              ))}
            </div>
          )}
        </div>

        <div class="reply-dialog-footer">
          <Space>
            {more1.value ? (
              <Button type="link" onClick={closeAll}>
                关闭全部
              </Button>
            ) : null}
            <Button type="primary" shape="round" onClick={onClose} style="width:128px;">
              关闭 (Esc)
            </Button>
          </Space>
        </div>
      </Modal>
    );
  }
});

import { computed, defineComponent, onMounted, PropType, ref } from 'vue';
import { Reply } from '@/api';
import { open } from '@/components/useDialog';
import { LikeOutlined, MessageOutlined } from '@ant-design/icons-vue';
export default defineComponent({
  name: 'ReplyItem',
  props: {
    /**
     * 帖子id
     */
    tid: {
      type: String,
      required: true
    },
    /**
     * 回复信息
     */
    reply: {
      type: Object as PropType<Reply>,
      required: true
    },
    /**
     * 是否是作者
     * 在弹框的顶部，显示当前正在查看的回复
     * 弹框下方的列表，都是回复该作者的。
     */
    isAuthor: Boolean
  },
  setup(props) {
    const { reply } = props;

    const contentRef = ref();
    const userUrl = computed(() => {
      return `//my.hupu.com/` + reply.puid;
    });

    function viewReply() {
      if (reply.check_reply_info) {
        if (reply.check_reply_info.num > 0) {
          open(props.tid, reply.pid);
        }
      }
    }

    onMounted(() => {
      const contentEl = contentRef.value as HTMLElement;

      for (const img of contentEl.querySelectorAll('img')) {
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.dataset.src = '';
        }
        if (img.dataset.gif) {
          img.classList.add('is-gif');
          img.addEventListener('click', function() {
            this.src = this.dataset.gif!;
          });
        }
      }
    });

    return () => (
      <div class="reply-item">
        <a href={userUrl.value} target="_blank">
          <img class="user-img" src={reply.userImg} alt={reply.userName} />
        </a>
        <div class="reply-right">
          <div class="reply-header">
            <div className="user">
              <a href={userUrl.value} target="_blank">
                <div class="user-name">{reply.userName}</div>
              </a>
              <span class="time">{reply.time}</span>
              <span>{reply.location}</span>
            </div>
            <div class="reply-info-operate">
              <div>
                <LikeOutlined />
                <span>{reply.light_count}</span>
              </div>
              {props.isAuthor ? null : (
                <div class="reply" onClick={viewReply}>
                  <MessageOutlined />
                  <span>{reply.check_reply_info?.num || 0}</span>
                </div>
              )}
            </div>
          </div>
          <p class="content" ref={contentRef} v-html={reply.content}></p>
        </div>
      </div>
    );
  }
});

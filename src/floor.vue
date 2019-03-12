<template>
  <div class="floor" :id="info.pid" style="z-index:79">
    <div class="user" style="z-index: 70;">
      <div :uname="uname" :uid="info.puid" class="j_u">
        <a :href="ulink" target="_blank" class="headpic">
          <img :src="info.userImg" width="45" height="45" :alt="uname">
        </a>
      </div>
    </div>
    <div class="floor_box">
      <div class="author">
        <div class="left">
          <a class="u" :href="ulink" target="_blank">{{uname}}</a>
          <span v-if="isOwner" class="post-owner">楼主</span>
          <span class="stime">{{stime}}</span>&nbsp;
          <span
            class="f666 button-light-inner"
            :class="[info.pid]"
            :pid="info.pid"
            :uid="info.puid"
            style="position:relative"
          ></span>
          <span
            class="f444"
            :class="[info.pid]"
            :pid="info.pid"
            :uid="info.puid"
            style="position:relative"
          >
            <span class="ilike_icon_list">
              <a
                class="ilike_icon"
                mid="1"
                href="javascript:;"
                style="width:25px;"
                dace_clk="clk_bbs_rlights"
              >亮了</a>
              (
              <span class="stime">{{info.light_count}}</span>)
            </span>
          </span>
        </div>
        <div class="right f666">
          <a
            title="我要赞赏"
            class="reply-sponsor-button"
            onclick
            href="javascript:"
            _orighref="javascript:"
            _tkworked="true"
            token="ef5fcbfe5e469422979408099dbc755d"
            ttime="1552276207.7072"
            data-isauthor="0"
            fid="34"
            :author="uname"
            :tid="tid"
            :pid="info.pid"
          >我要赞赏</a>
          <a :onclick="`report(8,${info.pid});return false;`">举报</a>
          <a :href="`/${tid}_${info.puid}.html`" rel="nofollow">只看此人</a>
          <a
            class="reply"
            lid
            :pid="info.pid"
            :href="`https://bbs.hupu.com/post.php?action=quote&amp;fid=34&amp;tid=${tid}&amp;pid=${info.pid}&amp;article=1`"
            @click="closeAll"
          >引用</a>
          <a @click="show">查看回复({{num}})</a>
        </div>
      </div>
      <table class="case" border="0" cellspacing="0" cellpadding="0">
        <tbody>
          <tr>
            <td v-html="info.content"></td>
          </tr>
        </tbody>
      </table>
      <div class="liangShare">&nbsp;</div>
      <div class="sign"></div>
    </div>
    <div class="clearfix"></div>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  props: {
    info: Object,
    tid: String,
  },
  computed: {

    uname() {
      return this.info.userName;
    },
    ulink() {
      return `https://my.hupu.com/${this.info.puid}`;
    },
    // 回复数量
    num() {
      return this.info.check_reply_info ? this.info.check_reply_info.num : 0;
    },
    stime() {
      let t = new Date(+this.info.create_time * 1000);
      let m = t.getMonth() + 1;
      if (m < 10) m = '0' + m;
      return `${t.getFullYear()}-${m}-${t.getDate()} ${t.getHours()}:${t.getMinutes()}`;
    },
    isOwner() {
      return window.__uid == this.info.puid;
    }
  },
  // 处理图片
  mounted() {
    $(this.$el).find('table img').each((i, img) => {
      img.src = img.getAttribute('data_url');
    })
  },
  methods: {
    // 查看回复
    show() {
      if (this.num === 0) return;
      this.$root.push(this.tid, this.info.pid);
    },
    close() {
      this.$emit('close');
    },
    closeAll() {
      this.$root.dialogs = [];
      // this.$emit('closeAll')
    }
  }
}
</script>
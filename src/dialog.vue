<template>
  <div class="showdiv" @click="close">
    <div class="pop" @click.stop>
      <div class="pop_content">
        <h2 class="mpop">
          <a @click="close"></a>
          查看回复
        </h2>

        <ul class="reply-list">
          <li v-for="reply in list" :key="reply.pid">
            <floor :info="reply" :tid="tid" @close="close" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Api from './api'
import Floor from './floor.vue'

export default {
  components: {
    Floor,
  },
  data() {
    return {
      list: [],
    }
  },
  props: {
    tid: String,
    pid: String,
  },
  created() {
    Api.getCheckReply(this.tid, this.pid)
      .then(data => data.data)
      .then(list => {
        this.list = list.result.list;
      })
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
}
</script>

<style lang="less" scoped>
.showdiv {
  display: block;
  height: 100%;
  z-index: 991;
  .pop {
    left: 10%;
    top: 10%;
    bottom: 10%;
    width: 80%;
    margin-left: 0;
  }
  .pop_content {
    height: 100%;
    position: relative;
  }

  /deep/ .author {
    padding-right: 10px;
  }

  ul {
    position: absolute;
    top: 35px;
    bottom: 0;
    // padding: 0 15px;
    overflow: scroll;
  }
}
</style>


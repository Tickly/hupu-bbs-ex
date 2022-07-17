import axios from 'axios';

const host = 'https://bbs.mobileapi.hupu.com';
const path = '/3/7.3.8/threads/';

export interface Reply {
  pid: string;
  check_reply_info?: {
    num: number;
    type: number;
  };
  light_count: number;
  content: string;
  userName: string;
  userImg: string;
  time: string;
}

// 获取某个回复的回复
function getCheckReply(tid: string, pid: string) {
  let url = host + path + 'getCheckReply';
  return axios.get(url, {
    params: {
      tid,
      pid,
      offline: 'json',
      fid: 34,
    },
  });
}

// 获取帖子的高亮回复
function getsThreadLightReplyList(tid: string) {
  let url = host + path + 'getsThreadLightReplyList';
  return axios.get(url, {
    params: {
      tid,
      offline: 'json',
      fid: 34,
    },
  });
}

export default {
  getCheckReply,
  getsThreadLightReplyList,
};

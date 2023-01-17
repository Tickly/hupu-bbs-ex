import axios from 'axios';

const host = 'https://bbs.mobileapi.hupu.com';
const path = '/3/7.3.8/threads/';

// https://games.mobileapi.hupu.com/3/8.0.26/bplapi/user/v1/page
// bddid=BTUFPSTZ4PO43PXRMOG4ZFYU6N6OLXAHVT5SZVDDHN3QCGS3DGDQ01&client=d1b270c0342f561134b55d234c27d0eef6ca4530&clientId=39736037&componentCode=skin_app_mine_page&crt=1668739856&deviceId=Buefzyf5jT9N3oEJiM0%2B5bzgPDEDUpCeZEz%2BfAjYk7GxI6twxdDm3GE8y/onS5OYC1EWH4adpPeJwC%2B1tgNxLcA%3D%3D&newapp=1&night=0&puid=73218817&sign=1d17f298e554791c63e25198a9bb06c6&time_zone=Asia/Shanghai

export interface Reply {
  /**
   * 回复id
   */
  pid: string;
  /**
   * 回帖的用户id
   */
  puid: string;
  check_reply_info?: {
    num: number;
    type: number;
  };
  /**
   * 亮了
   */
  light_count: number;
  /**
   * 回复内容
   */
  content: string;
  /**
   * 用户名
   */
  userName: string;
  /**
   * 用户头像
   */
  userImg: string;
  /**
   * 时间
   */
  time: string;
  /**
   * 地理位置
   */
  location: string;
}

// 获取某个回复的回复
function getCheckReply(tid: string, pid: string) {
  let url = host + path + 'getCheckReply';
  return axios.get(url, {
    params: {
      tid,
      pid,
      offline: 'json',
      fid: 34
    }
  });
}

// 获取帖子的高亮回复
function getsThreadLightReplyList(tid: string) {
  let url = host + path + 'getsThreadLightReplyList';
  return axios.get(url, {
    params: {
      tid,
      offline: 'json',
      fid: 34
    }
  });
}

export default {
  getCheckReply,
  getsThreadLightReplyList
};

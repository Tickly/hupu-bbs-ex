import $ from 'jquery'

window.addEventListener('load', () => {
  // 帖子id
  const [tid] = /(\d)+/.exec(location.pathname) as Array<string>;
  // 作者id
  const uid = $('#tpc .j_u').attr('uid');


  console.log(tid, uid)
})
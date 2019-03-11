import Api from './api'
import $ from 'jquery'
import Dialog from './dialog'


window.addEventListener('load', function () {

    // 帖子id
    let [tid] = /(\d)+/.exec(location.pathname);
    // 作者id
    let uid = $('#tpc .j_u').attr('uid');
    window.__uid = uid;

    Api.getsThreadLightReplyList(tid)
        // 处理接口返回数据
        .then(data => data.data.data.list)
        // 在界面上显示按钮
        .then(list => {
            let $floors = $('#readfloor>div');

            $floors.each(function (i, el) {
                let pid = el.id;
                // 获取到对应索引的回复
                let reply = list[i];
                // 获取该回复的回复数量
                let num = 0;
                if (reply.check_reply_info) num = reply.check_reply_info.num;

                // 创建元素
                let a = document.createElement('a');
                a.textContent = `查看回复(${num})`;
                a.addEventListener('click', function () {
                    if (num === 0) return;

                    Dialog.show(tid, pid);
                })

                // 加进页面中
                let $right = $(el).find('.floor_box .right');
                $right.append(a);

            })
        })
        .catch(console.error)




})
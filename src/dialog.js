import Vue from 'vue'
import HupuDialog from './dialog.vue'

export default {
    show(tid, pid) {
        let dialog = document.createElement('div');
        dialog.id = 'pid-' + pid;

        document.body.appendChild(dialog);

        new Vue({
            el: '#' + dialog.id,
            render: h => h(HupuDialog, {
                props: {
                    pid,
                    tid,
                }
            }),
        })
    }
}
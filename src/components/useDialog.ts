import { computed, ref, nextTick } from 'vue';

interface DialogProp {
  tid: string;
  pid: string;
}

const DialogProps = ref<DialogProp[]>([]);

function updateActiveDialog() {
  nextTick(() => {
    const dialogEls = Array.from(document.querySelectorAll('.reply-dialog'));
    if (dialogEls.length > 0) {
      const last = dialogEls.pop() as HTMLDivElement;
      last.focus();
    }
  });
}

/**
 *
 * @param tid 例如网址是这个 https://bbs.hupu.com/57448942.html 那么57448942就是tid
 * @param pid
 */
const open = (tid: string, pid: string): void => {
  DialogProps.value.push({
    tid,
    pid
  });
};

const close = (pid: string): void => {
  const index = DialogProps.value.findIndex(dp => dp.pid === pid);

  DialogProps.value.splice(index, 1);

  updateActiveDialog();
};

const closeAll = () => {
  DialogProps.value = [];
};

const closeLast = () => {
  DialogProps.value.pop();
  updateActiveDialog();
};

const more1 = computed(() => DialogProps.value.length > 1);

export { DialogProps, open, close, closeAll, more1, closeLast };

import { ref } from 'vue';

interface DialogProp {
  tid: string;
  pid: string;
}

const DialogProps = ref<DialogProp[]>([]);

const open = (tid: string, pid: string): void => {
  DialogProps.value.push({
    tid,
    pid,
  });
};

const close = (pid: string): void => {
  const index = DialogProps.value.findIndex((dp) => dp.pid === pid);

  DialogProps.value.splice(index, 1);
};

export { DialogProps, open, close };

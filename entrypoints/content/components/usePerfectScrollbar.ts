import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

export function useScrollbar() {
  let ps: PerfectScrollbar;

  function resize() {
    if (ps) ps.update();
  }

  return {
    bind(el: HTMLElement) {
      ps = new PerfectScrollbar(el);
      window.addEventListener('resize', resize);
    },
    unBind() {
      window.removeEventListener('resize', resize);
    }
  };
}

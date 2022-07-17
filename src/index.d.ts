declare module '*.vue' {
  import { defineComponent } from 'vue';
  export default defineComponent;
}

declare module '*.webp' {
  const value: string;
  export default value;
}

/// <reference types="vite/client" />

declare module '*.vue' {
  // eslint-disable-next-line import-helpers/order-imports
  import type { DefineComponent } from 'vue';

  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>;
  export default component;
}

declare module '*.sass';
declare module '*.png';

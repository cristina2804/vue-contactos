import { createPinia } from 'pinia';
import { App } from 'vue';

export const pinia = createPinia();

export const installPinia = (app: App<Element>) => {
  app.use(pinia);
};

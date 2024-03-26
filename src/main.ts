import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { installPinia } from './pinia';
import {
  Layout,
  Menu,
  Alert,
  Button,
  Flex,
  Divider,
  Avatar,
} from 'ant-design-vue';
import './styles/index.css';

const app = createApp(App);
app.use(store).use(router);
installPinia(app);
app
  .use(Layout)
  .use(Menu)
  .use(Alert)
  .use(Button)
  .use(Flex)
  .use(Divider)
  .use(Avatar);
app.mount('#app');

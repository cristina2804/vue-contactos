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
  Table,
  Switch,
  Typography,
  Input,
  Select,
  Space
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
  .use(Avatar)
  .use(Table)
  .use(Switch)
  .use(Typography)
  .use(Input)
  .use(Select)
  .use(Space);
app.mount('#app');

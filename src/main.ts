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
  Space,
  Drawer,
  Form,
  Row,
  Col,
  DatePicker,
  Card,
  Checkbox,
  Tooltip,
  Modal,
  Steps,
  Tabs,
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
  .use(Space)
  .use(Drawer)
  .use(Form)
  .use(Row)
  .use(Col)
  .use(DatePicker)
  .use(Card)
  .use(Checkbox)
  .use(Tooltip)
  .use(Modal)
  .use(Steps)
  .use(Tabs);
app.mount('#app');

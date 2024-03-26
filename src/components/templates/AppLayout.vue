<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider
      breakpoint="lg"
      collapsible
      collapsed-width="64"
      :collapsed="true"
      :trigger="null"
      :style="{
        backgroundColor: '#fff',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
      }"
    >
      <SideBar :items="items"/>
    </a-layout-sider>
    
    <a-layout :style="{ background: '#f7fbff' }">
      <Header :items="items"/>
      <a-layout-content :style="{ margin: '20px' }">
        <div
          :style="{
            padding: '24px',
            background: '#fff',
            minHeight: 'calc(100vh - 90px)',
            borderRadius: '5px',
            border: '2px solid #dedede',
          }"
        >
          <router-view />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import SideBar from "../organisms/SideBar.vue";
import Header from "../organisms/Header.vue";
import { h, ref } from "vue";
import {
  FundOutlined,
  EyeOutlined,
  UserOutlined,
  RocketOutlined,
  AppstoreAddOutlined,
  CalendarOutlined,
} from "@ant-design/icons-vue";

const items = [
  {
    key: "1",
    icon: () => h(FundOutlined),
    label: "Option 1",
    title: "Option 1",
    link: "/",
    name: "home",
  },
  {
    key: "2",
    icon: () => h(EyeOutlined),
    label: "Option 2",
    title: "Option 2",
    link: "/",
    name: "home",
  },
  {
    key: "3",
    icon: () => h(UserOutlined),
    label: "Contactos",
    title: "Contactos",
    link: "/contacts",
    name: "contacts",
  },
  {
    key: "4",
    icon: () => h(RocketOutlined),
    label: "Navigation One",
    title: "Navigation One",
    link: "/",
    name: "home",
  },
  {
    key: "5",
    icon: () => h(AppstoreAddOutlined),
    label: "Navigation Two",
    title: "Navigation Two",
    link: "/",
    name: "home",
  },
  {
    key: "6",
    icon: () => h(CalendarOutlined),
    label: "Navigation Two",
    title: "Navigation Two",
    link: "/",
    name: "home",
  },
];

</script>
<style scoped>
</style>

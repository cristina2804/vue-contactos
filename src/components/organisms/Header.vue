<template>
  <a-layout-header
    :style="{
      background: '#fff',
      padding: '0 22px',
      borderBottom: '2px solid #dedede',
    }"
  >
    <a-flex
      :justify="'space-between'"
      :align="'center'"
      :style="{ width: '100%' }"
    >
      <div :style="{ display: 'flex', height: '50px', alignItems: 'center' }">
        <h3>{{ selectedItemTitle }}</h3>
        <info-circle-outlined :style="{ marginLeft: '10px' }" />
        <a-alert
          message="Webphone conectado"
          type="success"
          :style="{
            background: '#f6ffed',
            borderColor: '#b7eb8f',
            color: '#52c41a',
            padding: '1px 8px',
            fontSize: '12px',
            borderRadius: '2px',
            marginLeft: '10px',
          }"
        />
      </div>
      <div :style="{ display: 'flex', height: '100%', alignItems: 'center' }">
        <clock />
        <a-divider
          type="vertical"
          :style="{ height: '2em', color: '#dedede' }"
        />
        <phone-outlined />
        <a-divider
          type="vertical"
          :style="{ height: '2em', color: '#dedede' }"
        />
        <bell-outlined />
        <a-divider
          type="vertical"
          :style="{ height: '2em', color: '#dedede' }"
        />
        <user-options />
      </div>
    </a-flex>
  </a-layout-header>
</template>

<script lang="ts" setup>
import { Ref, computed, ref } from "vue";
import { useLayoutStore } from '../../store/layout';
import Clock from "../atoms/Clock.vue";
import UserOptions from "../molecules/UserOptions.vue";
import {
  InfoCircleOutlined,
  PhoneOutlined,
  BellOutlined,
} from "@ant-design/icons-vue";

const dProps = defineProps({
  items: {
    type: Array as () => Array<any>,
    default: () => [],
  },
});

const storex = useLayoutStore();
const items: Ref<Array<any>> = ref(dProps.items);

const selectedItemTitle = computed(() => {
  const selectedIndex = Number(storex.getMenuSelected) - 1;
  if (selectedIndex >= 0 && selectedIndex < items.value.length) {
    return items.value[selectedIndex].title;
  } else {
    return "Página No Existe";
  }
});

</script>

<style></style>

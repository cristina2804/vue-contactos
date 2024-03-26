<template>
  <GlobalOutlined />
  <span :style="{ marginLeft: '10px' }">Hora Plataforma {{ currentHour }}</span>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
  GlobalOutlined,
} from "@ant-design/icons-vue";

const currentHour = ref('');

const getCurrentHour = () => {
  const now = new Date();
  const hour = now.getHours().toString().padStart(2, '0');
  const minute = now.getMinutes().toString().padStart(2, '0');
  const timezoneOffset = -(now.getTimezoneOffset() / 60);
  const timezone =
    timezoneOffset >= 0 ? `+${timezoneOffset}` : timezoneOffset.toString();
  const timezoneName =
    'GMT' + (Number(timezone) >= 0 ? `+${timezone}` : timezone);
  const countryName = 'Perú'; // Nombre del país
  return `${hour}:${minute} (${timezoneName}) ${countryName}`;
};

setInterval(() => {
  currentHour.value = getCurrentHour();
}, 1000);
</script>

<style></style>

<template>
  <h3>{{ title }}</h3>
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
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
});

const title = ref(props.title);
</script>

<style></style>

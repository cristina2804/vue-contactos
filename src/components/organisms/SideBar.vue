<template>
  <Logo />
  <a-menu
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    class="custom-menu"
    :style="{ borderInlineEnd: 'none', padding: '0px 6px' }"
  >
    <a-menu-item
      v-for="item in items"
      :key="item.key"
      :style="{ paddingInline: 'calc(50% - 14px)' }"
    >
      <router-link :to="item.link" @click="updateSelectedKey(item.link)">
        <span><component :is="item.icon" /></span>
      </router-link>
    </a-menu-item>
  </a-menu>
</template>

<script lang="ts" setup>
import { Ref, onMounted, ref } from "vue";
import { useLayoutStore } from '../../store/layout';
import { useRoute } from "vue-router";
import Logo from "../atoms/Logo.vue";

const route = useRoute();
const storex = useLayoutStore();

const dProps = defineProps({
  items: {
    type: Array as () => Array<any>,
    default: () => [],
  },
});

const selectedKeys: Ref<String[]> = ref([]);
const items = ref(dProps.items);

const updateSelectedKey = (path: string) => {
  const matchingItem = items.value.find((item: any) => item.link === path);
  if (matchingItem) {
    storex.updateMenuSelected([matchingItem?.key]);
    selectedKeys.value = [matchingItem.key];
  }
};

onMounted(() => {
  updateSelectedKey(route.path);
});

</script>

<style></style>

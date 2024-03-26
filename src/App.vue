<template>
  <router-view />
</template>

<script lang="ts" setup>
</script>
<style scoped>
.body {
  margin: 0px !important;
}

.logo {
  width: 34px;
  height: 34px;
  margin: 18px 16px;
  background-image: url('~@/assets/logo.png');
  background-size: cover;
  background-position: center;
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}

.anticon {
  font-size: 20px !important;
}

#a-layout-header .ant-menu-item-selected.custom-selected {
  background-color: #2276b9 !important;
}
</style>

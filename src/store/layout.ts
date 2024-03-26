import { defineStore } from 'pinia';

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    menuSelected: [''],
  }),
  getters: {
    getMenuSelected: (state: any) => state.menuSelected,
  },
  actions: {
    updateMenuSelected(menu: any) {
      this.menuSelected = menu;
    }
  },
});

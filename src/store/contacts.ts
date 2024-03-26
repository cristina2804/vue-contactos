import { defineStore } from 'pinia';

export const useContactsStore = defineStore('contacts', {
  state: () => ({
    totalContacts: 0,
    contacts: [''],
  }),
  getters: {
    getContacts: (state: any) => state.contacts,
    getTotalContacts: (state: any) => state.total,
  },
  actions: {
    updateContacts(contacts: any) {
      this.contacts = contacts;
    },
    updateTotalContacts(total: number) {
      this.totalContacts = total;
    }
  },
});

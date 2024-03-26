import { defineStore } from 'pinia';

export const useContactsStore = defineStore('contacts', {
  state: () => ({
    totalContacts: 0,
    contacts: [''],
    contactsFilterSimple: [''],
    filters: {
      contacto: '',
      empresa: '',
      portafolio: '',
      estado: ''
    }
  }),
  getters: {
    getContacts: (state: any) => state.contacts,
    getTotalContacts: (state: any) => state.total,
    getContactsFilterSimple: (state: any) => state.contactsFilterSimple,
    getFilters: (state: any) => state.filters,
  },
  actions: {
    updateContacts(contacts: any) {
      this.contacts = contacts;
      this.contactsFilterSimple = contacts;
    },
    updateTotalContacts(total: number) {
      this.totalContacts = total;
    },
    updateContactsFilterSimple(contactsFilter: any) {
      this.contactsFilterSimple = contactsFilter;
    },
    updateFilters(filters: any) {
      this.filters = filters;
    },
  },
});

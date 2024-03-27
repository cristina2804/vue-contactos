<template>
  <a-space>
    <a-input v-model:value="filter.contacto" placeholder="Buscar contacto" style="width: 250px">
      <template #prefix>
        <SearchOutlined :style="{ fontSize: '10px', color: '#bfbfbf'}" />
      </template>
    </a-input>
    <a-select
      ref="select"
      v-model:value="filter.empresa"
      @change="filterContacts"
      style="width: 200px"
      :options="optionsEmpresas"
    ></a-select>
    <a-select
      ref="select"
      v-model:value="filter.portafolio"
      @change="filterContacts"
      style="width: 200px"
      :options="optionsPortafolios"
      :disabled="filter.empresa == ''"
    ></a-select>
    <a-select
      ref="select"
      v-model:value="filter.estado"
      @change="filterContacts"
      style="width: 200px"
      :options="optionsEstados"
    ></a-select>
    <a-button type="primary" ghost @click="openFilter">
      Filtros Avanzados
    </a-button>
  </a-space>
  <filters-advanced-contacts ref="filtersAdvancedContactsRef" />
</template>

<script lang="ts" setup>
import { Ref, reactive, ref, watch } from 'vue';
import { useContactsStore } from '@/store/contacts';
import FiltersAdvancedContacts from "@/components/organisms/FiltersAdvancedContacts.vue";
import {
  SearchOutlined,
} from "@ant-design/icons-vue";

const storex = useContactsStore();
const filtersAdvancedContactsRef = ref(null);

const optionsEmpresas: Ref<Array<any>> = ref([]);
const optionsPortafolios: Ref<Array<any>> = ref([]);
const optionsEstados = ref([
  { value: '', label: 'Activos e Inactivos' },
  { value: 'true', label: 'Activos' },
  { value: 'false', label: 'Inactivos' },
]);
const filter = reactive({
  contacto: '',
  empresa: '',
  portafolio: '',
  estado: ''
});
const open = ref(false);

const openFilter = () => {
  if (filtersAdvancedContactsRef.value != null)
    filtersAdvancedContactsRef.value.openFilter();
}

const convertOptions = (data: any[], column: string, textAll: string) => {
  let options: any[] = []
  options = [...new Set(data.map((el: any) => el[column]))];
  options = options.map(el => ({ value: el, label: el }));
  return [{ value: '', label: textAll }, ...options];
}

const filterContacts = () => {
  let contacts = storex.getContacts;
  contacts = contacts.filter((el: any) =>
    (el.entity_name == filter.empresa || filter.empresa == '') &&
    (el.portfolio_name == filter.portafolio || filter.portafolio == '') &&
    (el.active.toString() == filter.estado || filter.estado == '')
  );
  storex.updateFilters(filter);
  storex.updateContactsFilterSimple(contacts);
}

watch(
  () => storex.getContacts,
  (data: Array<any>) => {
    optionsEmpresas.value = convertOptions(data, 'entity_name', 'Todas las empresas');
    optionsPortafolios.value = convertOptions(data, 'portfolio_name', 'Todas las campañas');
  }
);

</script>

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
      style="width: 200px"
      :options="optionsEmpresas"
    ></a-select>
    <a-select
      ref="select"
      v-model:value="filter.portafolio"
      style="width: 200px"
      :options="optionsPortafolios"
      :disabled="filter.empresa == ''"
    ></a-select>
    <a-select
      ref="select"
      v-model:value="filter.estado"
      style="width: 200px"
      :options="optionsEstados"
    ></a-select>
  </a-space>
</template>

<script lang="ts" setup>
import { Ref, reactive, ref, watch } from 'vue';
import { useContactsStore } from '@/store/contacts';
import {
  SearchOutlined,
} from "@ant-design/icons-vue";

const optionsEmpresas: Ref<Array<any>> = ref([]);
const optionsPortafolios: Ref<Array<any>> = ref([]);
const optionsEstados = ref([
  { value: '', label: 'Activos e Inactivos' },
  { value: true, label: 'Activos' },
  { value: false, label: 'Activos' },
]);
const filter = reactive({
  contacto: '',
  empresa: '',
  portafolio: '',
  estado: ''
});

const storex = useContactsStore();

watch(
  () => storex.getContacts,
  (data: Array<any>) => {
    optionsEmpresas.value = convertOptions(data, 'entity_name', 'Todas las empresas');
    optionsPortafolios.value = convertOptions(data, 'portfolio_name', 'Todas las campañas');
  }
);

const convertOptions = (data: any[], column: string, textAll: string) => {
  let options: any[] = []
  options = [...new Set(data.map((el: any) => el[column]))];
  options = options.map(el => ({ value: el, label: el }));
  return [{ value: '', label: textAll }, ...options];
}

</script>

<template>
  <a-table :columns="columns" :data-source="dataFilter" :scroll="{ x: 1300, y: 1000 }"  size="small" 
    bordered :loading="loadingTable"  :expand-column-width="100">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'operation'">
        <a-tooltip :title="record['active'] == true ? 'Inactivar' : 'Activar'" placement="top">
          <a-switch v-model:checked="record['active']" size="small" />
        </a-tooltip>
        <a-tooltip title="Eliminar" placement="top">
          <DeleteOutlined @click="eliminar(record['full_name'])" :style="{ marginLeft: '10px', color: '#1677ff' }" />
        </a-tooltip>
      </template>
      <template v-else-if="column.key === 'full_name'">
        <a @click="openDetailsContact('DP')">
          {{ record[column.key] }}
        </a>
      </template>
      <template v-else-if="column.key === 'phones'">
        <a @click="openDetailsContact('TE')">
          {{ record[column.key]?.length }} Teléfono{{ record[column.key]?.length == 1 ? '' : 's' }}
        </a>
      </template>
      <template v-else-if="column.key === 'queues'">
        <a target="_blank">
          {{ record[column.key]?.length }} Cola{{ record[column.key]?.length == 1 ? '' : 's' }}
        </a>
      </template>
      <template v-else-if="column.key === 'last_group'">
        <a target="_blank">
          {{ record[column.key] }}
        </a>
      </template>
      <template v-else-if="column.key === 'last_result'">
        <a target="_blank">
          {{ record[column.key] }}
        </a>
      </template>
      <template v-else-if="column.key === 'last_motive'">
        <a target="_blank">
          {{ record[column.key] }}
        </a>
      </template>
      <template v-else-if="column.key === 'last_submotive'">
        <a target="_blank">
          {{ record[column.key] }}
        </a>
      </template>
      <template v-else-if="column.key === 'last_management_date'">
        {{ formatearFecha(record[column.key]) }}
      </template>
      <template v-else-if="column.key === 'last_interaction_date'">
        {{ formatearFecha(record[column.key]) }}
      </template>
      <template v-else-if="column.key === 'created_at'">
        {{ formatearFechaLong(record[column.key]) }}
      </template>
      <template v-else-if="column.key === 'updated_at'">
        {{ formatearFechaLong(record[column.key]) }}
      </template>
    </template>
  </a-table>
  <DetailsContact :openDrawer="openDrawer" :tabActive="tabDrawer" @closeDrawer="closeDrawer"/>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import type { TableColumnsType } from 'ant-design-vue';
import { useContactsStore } from '../../store/contacts';
import DetailsContact from "@/components/organisms/DetailsContact.vue";
import axios from 'axios';
import dayjs from 'dayjs';
import {
  DeleteOutlined,
} from "@ant-design/icons-vue";
import Swal from 'sweetalert2';

const storex = useContactsStore();

const openDrawer = ref(false);
const tabDrawer = ref('DP');
const loadingTable = ref(false);
const columns: TableColumnsType = [
  { title: 'Cod Contacto', dataIndex: 'code', width: 130, key: 'code' },
  { title: 'Nombres y Apellidos', dataIndex: 'full_name', width: 300, key: 'full_name' },
  { title: 'Empresas', dataIndex: 'entity_name', width: 200, key: 'entity_name' },
  { title: 'Campaña', dataIndex: 'portfolio_name', width: 250, key: 'portfolio_name' },
  { title: 'Teléfono', dataIndex: 'phones', width: 120, key: 'phones' },
  { title: 'Número de Documento', dataIndex: 'document_number', width: 200, key: 'document_number' },
  { title: 'Canales', dataIndex: 'channels', width: 150, key: 'channels' },
  { title: 'Colas', dataIndex: 'queues', width: 100, key: 'queues' },
  { title: 'Fecha de última gestión', dataIndex: 'last_management_date', width: 150, key: 'last_management_date' },
  { title: 'Fecha de última interacción', dataIndex: 'last_interaction_date', width: 200, key: 'last_interaction_date' },
  { title: 'Último grupo', dataIndex: 'last_group', width: 150, key: 'last_group' },
  { title: 'Último resultado', dataIndex: 'last_result', width: 150, key: 'last_result' },
  { title: 'Últmo motivo', dataIndex: 'last_motive', width: 150, key: 'last_motive' },
  { title: 'Último submotivo', dataIndex: 'last_submotive', width: 150, key: 'last_submotive' },
  { title: 'Última vez gestionado por', dataIndex: 'last_management_user', width: 200, key: 'last_management_user' },
  { title: 'Usuario asignado', dataIndex: 'user_assigned', width: 200, key: 'user_assigned' },
  { title: 'Fecha de creación', dataIndex: 'created_at', width: 150, key: 'created_at' },
  { title: 'Fecha de última actualización', dataIndex: 'updated_at', width: 200, key: 'updated_at' },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
  },
];

const data = ref([{}]);
let api = process.env.VUE_APP_API_URL + 'contacts/clients/';

const formatearFechaLong = (fecha: string) => {
  return fecha != null ? dayjs(new Date(fecha)).format('DD/MM/YYYY') : '-';
};

const formatearFecha = (fecha: string) => {
  return fecha != null ? dayjs(new Date(fecha)).format('DD/MM/YY') : '-';
};

const getContacts = async () => {
  try {
    loadingTable.value = true;
    const response = await axios.get(api, {
      headers: {
        Authorization: `Bearer ${process.env.VUE_APP_TOKEN}`
      }
    });
    api = response.data.next;
    // La api no devuelve estado, agrego campo active para simulación
    data.value = response.data.results.map((el: any) => ({...el, active: true}));
    storex.updateContacts(data.value);
    storex.updateTotalContacts(response.data.count)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  loadingTable.value = false;
};

const openDetailsContact = (tab: string) => {
  console.log('entra aca');
  openDrawer.value = true;
  tabDrawer.value = tab;
}

const closeDrawer = () => {
  openDrawer.value = false;
  tabDrawer.value = 'DP';
}

const eliminar = (nombre: string) => {
  Swal.fire({
    title: '¿Estás seguro de eliminar el contacto ' + nombre + '?',
    text: '¡Recuerda que ya no se visualizará este contacto en la tabla. Si deseas volver a visualizarlo, deberás agregarlo nuevamente a Score. !',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#1677ff',
    cancelButtonColor: '##ffffff',
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar'
  }).then(async (result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Eliminado',
        'Se hizo la eliminación correctamente.',
        'success'
      );
    }
  });
}

const dataFilter = computed(() => {
  return storex.getContactsFilterSimple;
});

onMounted(async () => {
  await getContacts();
});


</script>

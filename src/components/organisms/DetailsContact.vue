<template>
  <a-drawer
    title="Detalles del Contacto"
    :width="660"
    :open="openDrawer"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
    :closable="false"
  >
    <div>
      <a-row :gutter="16">
        <div class="avatar-section">
          <a-avatar class="avatar" size="large" 
            :style="{ backgroundColor: '#f0f5ff', borderColor: '#85a5ff', color: '#1d39c4', verticalAlign: 'middle' }">
            {{ initials }}
          </a-avatar>
          <div class="content">
            <div class="top-section">
              <a-typography class="bold-text" :level="4">{{ name }}</a-typography>
              <a-typography class="italic-text">{{ campaign }}</a-typography>
            </div>
          </div>
        </div>
      </a-row>
      <a-row style="margin-top: 20px;">
        <a-tabs v-model:activeKey="activeKey" type="card">
          <a-tab-pane key="1" tab="Personal" force-render>
            <a-tabs v-model:activeKey="activeKey2">
              <a-tab-pane key="1" tab="Datos" force-render>
              </a-tab-pane>
              <a-tab-pane key="2" tab="Telefonos" force-render>
              </a-tab-pane>
            </a-tabs>
          </a-tab-pane>
          <a-tab-pane key="2" tab="Ticket">
          </a-tab-pane>
        </a-tabs>
      </a-row>
      <a-row>
        <div v-if="activeKey == '1' && activeKey2 == '1'">
          <a-typography-text type="secondary" class="centered-text">
            Puedes agregar o editar información acorde a los campos configurados.
          </a-typography-text><br/>
          ...datos personales...
        </div>
        <a-table v-if="activeKey == '1' && activeKey2 == '2'" 
          :scroll="{ x: 1000 }" :expand-column-width="10"  size="small"
          :dataSource="dataTelefonos" :columns="columnsTelefonos" />
        <a-table v-if="activeKey == '2'" 
          :scroll="{ x: 1500 }" :expand-column-width="10"  size="small"
          :dataSource="dataTickets" :columns="columnsTickets" />
      </a-row>
    </div>
    <template #extra>
      <a-space>
        <CloseOutlined @click="onClose"/>
      </a-space>
    </template>
    <template #footer>
      <a-flex :justify="'space-between'">
        <a-button type="link" danger @click="eliminarContacto">Eliminar contacto</a-button>
        <div>
          <a-button style="margin-right: 8px">Ver anterior contacto</a-button>
          <a-button type="primary">Ver siguiente contacto</a-button>
        </div>
      </a-flex>
    </template>
  </a-drawer>
</template>

<script lang="ts" setup>
import { Ref, ref, watch } from 'vue';
// import dayjs, { Dayjs } from 'dayjs';
const dateFormat = 'DD/MM/YY';
import { useContactsStore } from '../../store/contacts';
import { CloseOutlined } from "@ant-design/icons-vue";
import axios from 'axios';
import TransferSelect from "../molecules/TransferSelect.vue";
import Swal from 'sweetalert2';

const storex = useContactsStore();

const dProps = defineProps({
  openDrawer: {
    type: Boolean,
    default: false,
  },
  tabActive: {
    type: String,
    default: 'DP',
  }
});

const openDrawer = ref(dProps.openDrawer);
const tabActive = ref(dProps.tabActive);
const activeKey = ref('1');
const activeKey2 = ref('1');
const initials = ref('JM');
const name = 'Jenny Wilson Kong';
const campaign = 'Campaña: Ventas 2024 navidad ';

const dataTelefonos = ref([
  {
    key: '1',
    codigo: '+51',
    numero: '992839281',
    tipoTelefono: 'Celular',
    origen: 'Personal',
    operadorTelefonico: 'Movistar',
    prioridad: '1',
    observacion: 'Este número solo resp...',
  },
  {
    key: '2',
    codigo: '+51',
    numero: '992839281',
    tipoTelefono: 'Celular',
    origen: 'Personal',
    operadorTelefonico: 'Movistar',
    prioridad: '1',
    observacion: 'Este número solo resp...',
  },
  {
    key: '3',
    codigo: '+51',
    numero: '992839281',
    tipoTelefono: 'Celular',
    origen: '-',
    operadorTelefonico: 'Claro',
    prioridad: '1',
    observacion: 'Este número solo resp...',
  },
  {
    key: '4',
    codigo: '+51',
    numero: '992839281',
    tipoTelefono: 'Celular',
    origen: 'Personal',
    operadorTelefonico: 'Entel',
    prioridad: '2',
    observacion: 'Este número solo resp...',
  },
]);

const columnsTelefonos = ref([
  {
    title: 'Código del país',
    dataIndex: 'codigo',
    key: 'codigo',
    width: 40,
  },
  {
    title: 'Número',
    dataIndex: 'numero',
    key: 'numero',
    width: 30,
  },
  {
    title: 'Tipo de teléfono',
    dataIndex: 'tipoTelefono',
    key: 'tipoTelefono',
    width: 40,
  },
  {
    title: 'Origen',
    dataIndex: 'origen',
    key: 'origen',
    width: 40,
  },
  {
    title: 'Operador telefónico',
    dataIndex: 'operadorTelefonico',
    key: 'operadorTelefonico',
    width: 40,
  },
  {
    title: 'Prioridad',
    dataIndex: 'prioridad',
    key: 'prioridad',
    width: 40,
  },
  {
    title: 'Observación',
    dataIndex: 'observacion',
    key: 'observacion',
    width: 130,
  },
]);

const dataTickets = ref([
  {
    key: '1',
    fecha: '24/05/2024 10:04:23',
    canal: '',
    identificador: 'Roma Seguros',
    telefono: '5198765454',
    usuario: 'Carmen Rosa Gutierrez',
    grupo: 'Contacto Directo',
    resultado: 'Promesa de pago',
    motivo: 'En 24 horas',
    submotivo: '-',
    comentario: 'Contestó y se comp...',
  },
]);

const columnsTickets = ref([
  {
    title: 'Fecha y hora',
    dataIndex: 'fecha',
    key: 'fecha',
    width: 120,
  },
  {
    title: 'Canal',
    dataIndex: 'canal',
    key: 'canal',
    width: 30,
  },
  {
    title: 'Identificador',
    dataIndex: 'identificador',
    key: 'identificador',
    width: 40,
  },
  {
    title: 'Telefono del contacto',
    dataIndex: 'telefono',
    key: 'telefono',
    width: 160,
  },
  {
    title: 'Usuario que gestionó',
    dataIndex: 'usuario',
    key: 'usuario',
    width: 160,
  },
  {
    title: 'Grupo',
    dataIndex: 'grupo',
    key: 'grupo',
    width: 100,
  },
  {
    title: 'Resultado',
    dataIndex: 'resultado',
    key: 'resultado',
    width: 130,
  },
  {
    title: 'Motivo',
    dataIndex: 'motivo',
    key: 'motivo',
    width: 130,
  },
  {
    title: 'Submotivo',
    dataIndex: 'submotivo',
    key: 'submotivo',
    width: 130,
  },
  {
    title: 'Comentario',
    dataIndex: 'comentario',
    key: 'comentario',
    width: 130,
  },
]);

const onClose = () => {
  emits('closeDrawer');
}

const eliminarContacto = () => {
  Swal.fire({
    title: '¿Estás seguro de eliminar el contacto ' + name.value + '?',
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

watch(
  () => dProps.openDrawer,
  (v: boolean) => {
    console.log('cambia open drawer')
    openDrawer.value = v;
  }
);

watch(
  () => dProps.tabActive,
  (v: string) => {
    tabActive.value = v;
    console.log(tabActive.value);
    if (v == 'DP') {
      activeKey.value = '1';
      activeKey2.value = '1';
    } else if (v == 'TE') {
      activeKey.value = '1';
      activeKey2.value = '2';
    }
    console.log(activeKey2.value);
  }
);

const emits = defineEmits(['closeDrawer']);

</script>

<style scoped>
.avatar-section {
  display: flex;
  align-items: center;
}

.avatar {
  margin-right: 16px; /* Espacio entre el avatar y el contenido */
}

.bold-text {
  font-weight: bold;
}

.italic-text {
  font-style: italic;
  color: #8c8c8c;
}

</style>
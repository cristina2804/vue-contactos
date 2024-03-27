<template>
  <a-drawer
    title="Selecciona tus filtros por gestión"
    :width="480"
    :open="open"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
    v-if="filtersSimple"
    :closable="false"
  >
    <div class="drawer-content" v-if="filtersSimple.empresa == ''">
      <div class="top-text">Filtra tus contactos en base a su empresa y campaña.</div>
      <div class="centered-image-container">
        <a-row>
          <img src="~@/assets/icon-filter-fondo.png" alt="Imagen" class="centered-image">
        </a-row>
        <a-row>
          <a-typography-text type="secondary">
            Debes seleccionar una sola empresa y campaña para utilizar esta opción.
          </a-typography-text>
        </a-row>
      </div>
    </div>
    <div v-else>
      <a-form v-if="filtersSimple.empresa != '' && filtersSimple.portafolio != ''" :model="form" layout="vertical">
        <a-row :gutter="16">
          <a-col :span="24">
            Filtra tus contactos en base a sus gestiones realizadas. No olvides 
            aplicar tus filtros para que se visualicen en la tabla.
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24" style="margin-top: 10px;">
            <a-typography-text strong>
              Tipificaciones:
            </a-typography-text>
          </a-col>
          <a-col :span="24" style="margin-top: 10px;">
            <a-form-item label="Con gestiones realizadas" name="gestion" class="form-item-adapter">
              <a-select
                v-model:value="form.gestion"
                :options="optionsGestiones"
              ></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="Grupos" name="grupo" class="form-item-adapter">
              <a-tooltip v-if="form.gestion != '2'" title="La campaña seleccionada aún no cuenta con gestiones realizadas." placement="top">
                <a-select
                  ref="select"
                  placeholder="Seleccionar grupos"
                  v-model:value="form.grupo"
                  :options="optionsGrupos"
                  :disabled="form.gestion != '2'"
                ></a-select>
              </a-tooltip>
              <a-select
                v-else
                ref="select"
                placeholder="Seleccionar grupos"
                v-model:value="form.grupo"
                :options="optionsGrupos"
                :disabled="form.gestion != '2'"
              ></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="Resultado" name="resultado" class="form-item-adapter">
              <a-tooltip v-if="form.gestion != '2'" title="La campaña seleccionada aún no cuenta con gestiones realizadas." placement="top">
                <a-select
                  ref="select"
                  placeholder="Seleccionar resultados"
                  v-model:value="form.resultado"
                  :options="optionsResultados"
                  :disabled="form.gestion != '2'"
                ></a-select>
              </a-tooltip>
              <a-select
                v-else
                ref="select"
                placeholder="Seleccionar resultados"
                v-model:value="form.resultado"
                :options="optionsResultados"
                :disabled="form.gestion != '2'"
              ></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            Fecha de última gestión:
          </a-col>
          <a-col :span="12">
            <a-form-item label="Desde" name="fechaDesde" class="form-item-adapter">
              <a-tooltip v-if="form.gestion != '2'" title="La campaña seleccionada aún no cuenta con gestiones realizadas." placement="top">
                <a-date-picker v-model:value="form.fechaDesde" 
                  :format="dateFormat" style="width: 100%"
                  placeholder="--/--/--" suffix-icon=""
                  :disabled="form.gestion != '2'" />
              </a-tooltip>
              <a-date-picker v-else v-model:value="form.fechaDesde" 
                :format="dateFormat" style="width: 100%"
                placeholder="--/--/--" suffix-icon=""
                :disabled="form.gestion != '2'" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Hasta" name="fechaHasta" class="form-item-adapter">
              <a-tooltip v-if="form.gestion != '2'" title="La campaña seleccionada aún no cuenta con gestiones realizadas." placement="top">
                <a-date-picker ref="tooltipRef" v-model:value="form.fechaHasta" 
                  :format="dateFormat" style="width: 100%"
                  placeholder="--/--/--" suffix-icon=""
                  :disabled="form.gestion != '2'" />
              </a-tooltip>
              <v-else>
                <a-date-picker ref="tooltipRef" v-model:value="form.fechaHasta" 
                  :format="dateFormat" style="width: 100%"
                  placeholder="--/--/--" suffix-icon=""
                  :disabled="form.gestion != '2'" />
              </v-else>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-typography-text strong>
              Asignación de contactos:
            </a-typography-text>
          </a-col>
          <a-col :span="24" style="margin-top: 10px;">
            <a-form-item label="Tipo de vista" name="tipoVista" class="form-item-adapter">
              <a-select
                ref="select"
                v-model:value="form.tipoVista"
                :options="optionsTiposVista"
              ></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-typography-text strong>
              Última vez gestionado por:
            </a-typography-text>
          </a-col>
          <TransferSelect />
        </a-row>
      </a-form>
    </div>
    <template #extra>
      <a-space>
        <CloseOutlined @click="onClose"/>
        <!-- <a-button @click="onClose">Cancel</a-button>
        <a-button type="primary" @click="onClose">Submit</a-button> -->
      </a-space>
    </template>
    <template #footer v-if="filtersSimple.empresa != ''">
      <a-button style="margin-right: 8px" @click="onClose">Limpiar</a-button>
      <a-button type="primary" @click="filtrar">Aplicar</a-button>
    </template>
  </a-drawer>
</template>

<script lang="ts" setup>
import { Ref, ref, watch } from 'vue';
// import dayjs, { Dayjs } from 'dayjs';
const dateFormat = 'DD/MM/YY';
import { useContactsStore } from '@/store/contacts';
import { CloseOutlined } from "@ant-design/icons-vue";
import axios from 'axios';
import TransferSelect from "@/components/molecules/TransferSelect.vue";

const storex = useContactsStore();

const form = ref({
  gestion: '',
  grupo: null,
  resultado: null,
  fechaDesde: null,
  fechaHasta: null,
  tipoVista: '',
  description: '',
});

const optionsGestiones = ref([
  { value: '', label: 'Gestionados y sin gestionar' },
  { value: '1', label: 'Gestionados' },
  { value: '2', label: 'Sin gestionar' },
]);

const optionsGrupos = ref([
  { value: '1', label: 'Grupo 1' },
  { value: '2', label: 'Grupo 2' },
  { value: '2', label: 'Grupo 3' },
]);

const optionsResultados = ref([
  { value: '1', label: 'Resultado 1' },
  { value: '2', label: 'Resultado 2' },
  { value: '3', label: 'Resultado 3' },
]);

const optionsTiposVista = ref([
  { value: '', label: 'Contactos asignados y no asignados' },
  { value: '1', label: 'Solo contactos asignados' },
  { value: '2', label: 'Contactos no asignados' },
]);

const open = ref(false);
const tooltipRef = ref(null);
const filtersSimple: Ref<any> = ref(null);

let api = process.env.VUE_APP_API_URL + 'contacts/clients/';

const openFilter = () => {
  filtersSimple.value = storex.getFilters;
  open.value = true;
}

const onClose = () => {
  open.value = false;
}

const filtrar = async () => {
  try {
    const response = await axios.post(api, {
      entity_id: 1,
      portafolio_id: 1,
      base_id: 1,
      groups_id: [],
      results_id: [],
      users_id: [],
      last_management_date_start: "2022-01-01 12:54:45",
      last_management_date_end: "2022-01-01 12:54:45",
      has_products: false,
      assigned: "1"
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.VUE_APP_TOKEN}`
      }
    });
    api = response.data.next;
    // La api no devuelve estado, agrego campo active para simulación
    const data = response.data.results.map((el: any) => ({...el, active: true}));
    storex.updateContacts(data);
    storex.updateTotalContacts(response.data.count)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  onClose();
}

defineExpose({ openFilter });

</script>

<style scoped>
.form-item-adapter {
  margin-bottom: 10px;
}
</style>
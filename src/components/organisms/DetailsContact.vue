<template>
    <a-modal
      progress-dot
      :open="modalVisible"
      :footer="null"
      title="Crear un nuevo contacto"
      @cancel="cerrarModal"
      :width="'667px'"
    >
      <div style="padding: 10px 60px;">
        <a-steps :current="currentStep" style="margin-top: 30px;">
          <a-step title="Completar datos"></a-step>
          <a-step title="Asignar campaña"></a-step>
        </a-steps>
  
        <div v-show="currentStep === 0">
          <h2 style="text-align: center;">Datos personales</h2>
          <a-form ref="formulario" @submit.prevent="continuarStep">
            <a-row :gutter="16">
              <a-col :span="24">
                <label>* Nombres</label>
                <a-input v-model:value="nombres" placeholder="Escribir nombres" 
                  required></a-input>
              </a-col>
            </a-row>
            <a-row :gutter="16" style="margin-top: 10px;">
              <a-col :span="12">
                <label>* Apellido paterno</label>
                <a-input v-model:value="apellidoPaterno" placeholder="Escribir apellido paterno"
                  required></a-input>
              </a-col>
              <a-col :span="12">
                <label>Apellido materno</label>
                <a-input v-model:value="apellidoMaterno" placeholder="Escribir apellido materno"></a-input>
              </a-col>
            </a-row>
            <a-row :gutter="16" style="margin-top: 10px;">
              <a-col :span="12">
                <label>Tipo de documento</label><br/>
                <a-select
                  style="width: 100%;"
                  v-model:value="tipoDocumento"
                  :options="optionsDocumentos"
                ></a-select>
              </a-col>
              <a-col :span="12">
                <label>Número de documento</label>
                <a-input v-model:value="numeroDocumento" placeholder="Escribir número de documento (campo obligatorio)" required></a-input>
              </a-col>
            </a-row>
            <a-row :gutter="16" style="margin-top: 10px;">
              <a-col :span="12">
                <label>Dirección</label>
                <a-input v-model:value="direccion" placeholder="Escribir dirección"></a-input>
              </a-col>
              <a-col :span="12">
                <label>Correo electrónico</label>
                <a-input v-model:value="correoElectronico" placeholder="Escribir correo electrónico"></a-input>
              </a-col>
            </a-row>
            <a-row :gutter="16" style="margin-top: 10px;">
              <a-col :span="24">
                <label>Teléfono de contacto</label>
                <a-input v-model:value:value="telefono" :addon-before="prefijoTelefono" />
              </a-col>
            </a-row>
            <a-row :gutter="16" style="margin-top: 10px;">
              <a-col :span="24" style="text-align: center;">
                Podrás agregar más de cada uno de estos datos después de crear el contacto
              </a-col>
            </a-row>
            <a-row :gutter="16" class="button-group">
              <a-button @click="cerrarModal">Cancelar</a-button>
              <a-button @click="continuarStep" style="margin-left: 10px;">Continuar</a-button>
            </a-row>
          </a-form>
        </div>
  
        <div v-show="currentStep === 1">
          <h2 style="text-align: center;">Selecciona Camapaña</h2>
          <a-row :gutter="16">
            <a-col :span="24">
              Selecciona la campaña donde quieres crear este nuevo contacto.
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="24">
              <a-table :columns="columns" :data-source="data" :pagination="false">
                <template #bodyCell="{ column, record, text }">
                  <template v-if="column.dataIndex === 'actions'">
                    <a @click="saveContact(record)">{{ text }}</a>
                  </template>
                </template>
              </a-table>
            </a-col>
          </a-row>
          <a-row :gutter="16" class="button-group">
            <a-button @click="retrocederStep" style="margin-left: 10px;">Volver</a-button>
          </a-row>
        </div>
      </div>
    </a-modal>
  </template>
  <script lang="ts" setup>
  import { ref, watch } from 'vue';
  import Swal from 'sweetalert2';
  import axios from 'axios';
  
  const dProps = defineProps({
    modalVisible: {
      type: Boolean,
      default: false,
    },
  });
  
  const currentStep = ref(0);
  const nombres = ref('');
  const apellidoPaterno = ref('');
  const apellidoMaterno = ref('');
  const tipoDocumento = ref('DNI');
  const numeroDocumento = ref('');
  const direccion = ref('');
  const correoElectronico = ref('');
  const prefijoTelefono = ref('+51');
  const telefono = ref('');
  const modalVisible = ref(dProps.modalVisible);
  
  const optionsDocumentos = ref([
    { id: 1, nombre: 'DNI', selected: false },
  ]);
  
  const columns = [
    {
      title: 'Empresa',
      dataIndex: 'entity_name',
      key: 'entity_name',
      width: 150,
    },
    {
      title: 'Campaña',
      dataIndex: 'portfolio_name',
      key: 'portfolio_name',
      width: 150,
    },
    {
      title: 'Acciones',
      dataIndex: 'actions',
      key: 'actions'
    },
  ];
  
  const data = [
    {
      key: '1',
      entity_name: 'ScoreQA TEST',
      portfolio_name: 'Campaña QA CDZR',
      portfolio: '97',
      actions: 'Crear contacto aquí'
    },
  ];
  
  let api = process.env.VUE_APP_API_URL + 'contacts/clients/create/';
  
  const continuarStep = async () => {
    if (nombres.value != '' && apellidoPaterno.value != '') {
      currentStep.value++;
    } else {
      alert('Por favor completa todos los campos obligatorios.');
    }
  };
  
  const retrocederStep = async () => {
    currentStep.value--;
  }
  
  const saveContact = async (empresa: any) => {
    console.log(empresa)
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Se guardará el contacto en la campaña seleccionada!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1677ff',
      cancelButtonColor: '##ffffff',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        // formData.append('entity', '1');
        // formData.append('code', '28282');
        // formData.append('type_document', ''); //algunos campos generan error al no tener los id
        // formData.append('document_number', numeroDocumento.value);
        formData.append('first_name', nombres.value);
        formData.append('paternal_surname', apellidoPaterno.value);
        // formData.append('birthdate', '');
        formData.append('portfolio', empresa.portfolio);
        // formData.append('base', '1');
        // formData.append('code_phone', '51');
        // formData.append('phone', prefijoTelefono.value);
        // formData.append('country', '1');
        axios.post(api, formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${process.env.VUE_APP_TOKEN}`
          }
        }).then(response => {
          console.log(response);
          Swal.fire(
            'Guardado',
            'Se hizo el registro correctamente.',
            'success'
          );
        })
        .catch(error => {
          console.error('Error:', error);
        });
      }
    });
    console.log(empresa);
  }
  
  const cerrarModal = () => {
    emits('closeModal');
  }
  
  const clearModal = () => {
    currentStep.value = 0;
    nombres.value = '';
    apellidoPaterno.value = '';
    apellidoMaterno.value = '';
    tipoDocumento.value = 'DNI';
    numeroDocumento.value = '';
    direccion.value = '';
    correoElectronico.value = '';
    prefijoTelefono.value = '+51';
    telefono.value = '';
  }
  
  const emits = defineEmits(['closeModal']);
  
  watch(
    () => dProps.modalVisible,
    (v: boolean) => {
      clearModal();
      modalVisible.value = v;
    }
  );
  
  </script>
  
  <style scoped>
  .button-group {
    display: flex;
    justify-content: center;
    margin-top: 30px;
    text-align: center;
  }
  </style>
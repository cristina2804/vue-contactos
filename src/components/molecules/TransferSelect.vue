<template>
  <a-col :span="12" style="margin-top: 10px;">
    Usuarios
    <a-card style="height: 300px;">
      <template #default style="margin: 0">
        <div>
          <a-checkbox v-model:checked="selectAll">Seleccionar todo</a-checkbox>
          <a-divider style="margin: 6px 0;"></a-divider>
          <a-input v-model="search" placeholder="Buscar los usuarios aquí" />
          <div style="margin-top: 10px;">
            <a-checkbox v-model:checked="seleccionarTeleoperadores">
              <a-typography-text strong>
                Teleoperador
              </a-typography-text>
            </a-checkbox>
            <a-divider style="margin: 0; margin-top: 6px;"></a-divider>
            <ul class="lista-sin-estilo">
              <li v-for="teleoperador in teleoperadores" :key="teleoperador.id" 
                style="display: flex; justify-content: space-between; padding: 2px 0px;">
                <a-checkbox v-model:checked="teleoperador.selected">
                  {{ truncateText(teleoperador.nombre) }}
                </a-checkbox>
                <a-avatar size="small">
                  <template #icon><UserOutlined /></template>
                </a-avatar>
              </li>
            </ul>
          </div>
          <div>
            <a-checkbox v-model:checked="seleccionarAgentesVirtuales">
              <a-typography-text strong>
                Agente Virtual
              </a-typography-text>
            </a-checkbox>
            <a-divider style="margin: 0; margin-top: 6px;"></a-divider>
            <ul class="lista-sin-estilo">
              <li v-for="agenteVirtual in agentesVirtuales" :key="agenteVirtual.id"
                style="display: flex; justify-content: space-between;">
                <a-checkbox v-model:checked="agenteVirtual.selected">
                  <span class="texto-truncado">{{ truncateText(agenteVirtual.nombre) }}</span>
                </a-checkbox>
                <a-avatar size="small">
                  <template #icon><UserOutlined /></template>
                </a-avatar>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </a-card>
  </a-col>
  <a-col :span="12" style="margin-top: 10px;">
    Seleccionados
    <a-card v-if="personasSeleccionadas.length == 0"
      style="height: 300px; display: flex; justify-content: center; align-items: center;">
      <div class="centered-content" v-if="personasSeleccionadas.length == 0">
        <img src="~@/assets/icon-seleccionados.png" alt="Imagen" class="centered-image">
        <a-typography-text type="secondary" class="centered-text">
          Aquí se visualizará los usuarios que vaya seleccionando.
        </a-typography-text>
      </div>
    </a-card>
    <a-card v-else style="height: 300px;">
      <div>
        <ul class="lista-sin-estilo">
          <li v-for="persona in personasSeleccionadas" :key="persona.id"
            style="display: flex; justify-content: space-between; margin-top: 6px;">
            <span class="texto-truncado">{{ truncateText(persona.nombre) }}</span>
            <a-avatar size="small">
              <template #icon><UserOutlined /></template>
            </a-avatar>
          </li>
        </ul>
      </div>
    </a-card>
  </a-col>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import { UserOutlined } from "@ant-design/icons-vue";

const search = '';
const selectAll = ref(false);
const seleccionarTeleoperadores = ref(false);
const seleccionarAgentesVirtuales = ref(false);
const teleoperadores = ref([
  { id: 1, nombre: 'Julio Machahuay', selected: false },
  { id: 2, nombre: 'Fernando Rios Briones', selected: false },
  { id: 3, nombre: 'Fernando Rios Briones', selected: false },
])

const agentesVirtuales = ref([
  { id: 4, nombre: 'Fernando Rios Brionesasasd', selected: false },
])

const truncateText = (text: string, maxLength = 12) => {
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.slice(0, maxLength) + '...';
  }
};

const personasSeleccionadas = computed(() => {
  const teleoperadoresSelected = teleoperadores.value.filter((el: any) => el.selected == true );
  const agentesVirtualesSelected = agentesVirtuales.value.filter((el: any) => el.selected == true );
  return [...teleoperadoresSelected, ...agentesVirtualesSelected];
});

</script>

<style scoped>
.lista-sin-estilo {
  list-style-type: none;
  padding: 0;
  margin: 10px;
}
</style>
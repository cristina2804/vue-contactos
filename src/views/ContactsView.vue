<template>
  <a-flex
    :justify="'space-between'"
    :align="'center'"
    :style="{ width: '100%' }"
  >
    <div>
      <span>
        Gestiona los contactos de tus campalas. Puedes ver, editar información 
        y realizar acciones individuales como llamadas. <a>Click aquí</a> para 
        conocer más.
      </span>
    </div>
    <div>
      <a-typography-text strong>
        Contactos encontrados:
      </a-typography-text>
      <span>
        {{ total }}
      </span>
    </div>
  </a-flex>
  <a-flex
    :justify="'space-between'"
    :align="'center'"
    :style="{ width: '100%', marginTop: '20px' }"
  >
    <filters-contacts />
    <div>
      <a-button type="primary" ghost>
        Crear Contacto
        <PlusOutlined />
      </a-button>
    </div>
  </a-flex>
  <br />
  <table-contacts />
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import FiltersContacts from "@/components/organisms/FiltersContacts.vue";
import TableContacts from "@/components/organisms/TableContacts.vue";
import { useContactsStore } from "@/store/contacts";
import { PlusOutlined } from "@ant-design/icons-vue";
const storex = useContactsStore();
const total = ref(0);

watch(
  () => storex.getTotalContacts,
  (v: number) => {
    total.value = v;
  }
);

</script>

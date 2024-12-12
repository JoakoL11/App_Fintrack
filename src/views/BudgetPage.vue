<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Presupuestos</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- Botón para agregar presupuesto -->
      <div class="button-container-center">
        <ion-button class="expand-block" @click="showAddBudgetModal">AGREGAR PRESUPUESTO</ion-button>
      </div>

      <!-- Lista de presupuestos -->
      <ion-list v-if="budgetStore.budgets.length > 0">
        <ion-item v-for="budget in budgetStore.budgets" :key="budget.id">
          <ion-card>
            <ion-card-content>
              <p><strong>Categoría:</strong> {{ budget.category }}</p>
              <p><strong>Límite:</strong> {{ formatCurrency(budget.limit) }}</p>
              <p><strong>Gastado:</strong> {{ formatCurrency(budget.spent) }}</p>
              <div class="button-container">
                <ion-button color="primary" fill="outline" @click="prepareEditBudget(index)">
                  EDITAR
                </ion-button>
                <ion-button color="danger" @click="deleteBudget(budget.id)">
                  ELIMINAR
                </ion-button>
              </div>
            </ion-card-content>
          </ion-card>
        </ion-item>
      </ion-list>

      <!-- Modal para editar presupuesto -->
      <ion-modal :is-open="isEditModalOpen">
        <ion-header>
          <ion-toolbar>
            <ion-title>Editar Presupuesto</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="closeEditModal">CERRAR</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-item>
            <ion-label position="stacked">Categoría</ion-label>
            <ion-input v-model="editingBudget.category" placeholder="Categoría del presupuesto"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Límite</ion-label>
            <ion-input v-model.number="editingBudget.limit" type="number" placeholder="Límite del presupuesto"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Gastado</ion-label>
            <ion-input v-model.number="editingBudget.spent" type="number" placeholder="Cantidad gastada"></ion-input>
          </ion-item>
          <ion-button expand="block" @click="saveEditedBudget">GUARDAR CAMBIOS</ion-button>
        </ion-content>
      </ion-modal>

      <!-- Modal para agregar nuevo presupuesto -->
      <ion-modal :is-open="isAddModalOpen">
        <ion-header>
          <ion-toolbar>
            <ion-title>Agregar Nuevo Presupuesto</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="closeAddModal">CERRAR</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-item>
            <ion-label position="stacked">Categoría</ion-label>
            <ion-input
              v-model="newBudget.category"
              placeholder="Categoría del presupuesto"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Límite</ion-label>
            <ion-input
              v-model.number="newBudget.limit"
              type="number"
              placeholder="Límite del presupuesto"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Gastado</ion-label>
            <ion-input
              v-model.number="newBudget.spent"
              type="number"
              placeholder="Cantidad gastada"
            ></ion-input>
          </ion-item>
          <ion-button expand="block" @click="addBudget">AGREGAR PRESUPUESTO</ion-button>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonCard,
  IonCardContent,
  IonButton,
  IonModal,
  IonLabel,
  IonInput
} from "@ionic/vue"; // Importación de componentes de Ionic
import { useBudgetStore } from "@/store/Budget.js";

const budgetStore = useBudgetStore();
const budgets = ref([]); // Array local para presupuesto

// Estado para los modales y datos
const isEditModalOpen = ref(false);
const isAddModalOpen = ref(false);
const editingBudget = ref({
  id: "",
  category: "",
  limit: 0,
  spent: 0
});
const newBudget = ref({
  category: "",
  limit: 0,
  spent: 0
});

// Al montar el componente, activar el listener en tiempo real
onMounted(() => {
  budgetStore.fetchBudgets();
  isEditModalOpen.value = false; // Asegurar que el modal de edición esté cerrado
  isAddModalOpen.value = false; // Asegurar que el modal de agregar esté cerrado
});

// Función para abrir el modal de agregar presupuesto
const showAddBudgetModal = () => {
  isAddModalOpen.value = true;
};

// Función para cerrar el modal de agregar presupuesto
const closeAddModal = () => {
  isAddModalOpen.value = false;
  newBudget.value = { category: "", limit: 0, spent: 0 };
};

// Función para agregar un presupuesto
const addBudget = () => {
  if (!newBudget.value.category.trim() || newBudget.value.limit <= 0 || newBudget.value.spent < 0) {
    alert("Por favor completa todos los campos correctamente.");
    return;
  }

  // Enviar el presupuesto directamente al store
  budgetStore.addBudget({ ...newBudget.value });
  closeAddModal();
};

// Función para preparar datos para editar presupuesto
const prepareEditBudget = (index) => {
  editingBudget.value = { ...budgets[index] };
  isEditModalOpen.value = true;
};

// Función para guardar cambios al editar un presupuesto
const saveEditedBudget = () => {
  const { id, ...updatedBudget } = editingBudget.value;
  if (!id) {
    alert("Error: ID no encontrado.");
    return;
  }
  budgetStore.updateBudget(id, updatedBudget);
  closeEditModal();
};

// Función para cerrar el modal de edición
const closeEditModal = () => {
  isEditModalOpen.value = false;
};

// Función para eliminar un presupuesto
const deleteBudget = (id) => {
  budgetStore.deleteBudget(id);
};

// Función para formatear números como moneda
const formatCurrency = (value) => {
  if (!value) return "$0.00";
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "USD" }).format(value);
};
</script>

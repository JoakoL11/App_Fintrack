<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Inversiones</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-button expand="block" @click="showAddInvestmentModal">AGREGAR INVERSIÓN</ion-button>

      <!-- lista de inversiones -->
      <ion-list v-if="investmentStore.investments.length > 0">
  <ion-item v-for="investment in investmentStore.investments" :key="investment.id">
    <ion-card class="investment-card">
      <ion-card-content>
        <p><strong>Nombre:</strong> {{ investment.name }}</p>
        <p><strong>Monto:</strong> {{ formatCurrency(investment.amount) }}</p>
        <p><strong>Tipo:</strong> {{ investment.type }}</p>
        <p><strong>Fecha:</strong> {{ new Date(investment.date).toLocaleDateString() }}</p>

        <div class="button-container">
          <!-- Cambiar el evento para pasar el `id` en lugar del índice -->
          <ion-button color="primary" fill="outline" @click="prepareEditInvestment(investment.id)">
            EDITAR
          </ion-button>
          <ion-button color="danger" @click="deleteInvestment(investment.id)">
            ELIMINAR
          </ion-button>
        </div>
      </ion-card-content>
    </ion-card>
  </ion-item>
</ion-list>

      <!-- Modal de edición -->
      <ion-modal :is-open="isEditModalOpen">
        <ion-header>
          <ion-toolbar>
            <ion-title>Editar Inversión</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="closeEditModal">CERRAR</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-item>
            <ion-label position="stacked">Nombre</ion-label>
            <ion-input v-model="editingInvestment.name" placeholder="Nombre de la inversión"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Monto</ion-label>
            <ion-input v-model.number="editingInvestment.amount" type="number" placeholder="Monto de la inversión"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Tipo</ion-label>
            <ion-select v-model="editingInvestment.type">
              <ion-select-option value="Acciones">Acciones</ion-select-option>
              <ion-select-option value="Bonos">Bonos</ion-select-option>
              <ion-select-option value="Bienes Raíces">Bienes Raíces</ion-select-option>
              <ion-select-option value="Otros">Otros</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Fecha</ion-label>
            <ion-datetime v-model="editingInvestment.date" display-format="DD/MM/YYYY"></ion-datetime>
          </ion-item>
          <ion-button expand="block" @click="saveEditedInvestment">GUARDAR CAMBIOS</ion-button>
        </ion-content>
      </ion-modal>

      <!-- Modal para agregar nueva inversión -->
      <ion-modal :is-open="isAddModalOpen">
        <ion-header>
          <ion-toolbar>
            <ion-title>Agregar Nueva Inversión</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="closeAddModal">CERRAR</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-item>
            <ion-label position="stacked">Nombre</ion-label>
            <ion-input v-model="newInvestment.name" placeholder="Nombre de la inversión"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Monto</ion-label>
            <ion-input v-model.number="newInvestment.amount" type="number" placeholder="Monto de la inversión"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Tipo</ion-label>
            <ion-select v-model="newInvestment.type">
              <ion-select-option value="Acciones">Acciones</ion-select-option>
              <ion-select-option value="Bonos">Bonos</ion-select-option>
              <ion-select-option value="Bienes Raíces">Bienes Raíces</ion-select-option>
              <ion-select-option value="Otros">Otros</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Fecha</ion-label>
            <ion-datetime v-model="newInvestment.date" display-format="DD/MM/YYYY"></ion-datetime>
          </ion-item>
          <ion-button expand="block" @click="addNewInvestment">AGREGAR INVERSIÓN</ion-button>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useInvestmentStore } from "@/store/Investment.js"; // Importar el store
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem,
  IonCard, IonCardContent, IonButton, IonModal, IonButtons, IonInput, IonLabel,
  IonSelect, IonSelectOption, IonDatetime
} from '@ionic/vue';

// Usar el store de inversiones
const investmentStore = useInvestmentStore(); 

const investments = ref([]); // Array local para las inversiones

// Estados para los modales
const isEditModalOpen = ref(false);
const isAddModalOpen = ref(false);

// Variables para los formularios de edición y agregar
const editingInvestment = ref({ name: '', amount: 0, type: '', date: new Date().toISOString() });
const newInvestment = ref({ name: '', amount: 0, type: '', date: new Date().toISOString() });


onMounted(async () => {
  await investmentStore.fetchInvestments(); // Obtener las inversiones desde el store
  console.log("Inversiones obtenidas"); // Verificar las inversiones
});

// Funciones de UI
const showAddInvestmentModal = () => {
  isAddModalOpen.value = true;
};

const closeAddModal = () => {
  isAddModalOpen.value = false;
  newInvestment.value = { name: '', amount: 0, type: '', date: new Date().toISOString() };
};

const closeEditModal = () => {
  isEditModalOpen.value = false;
};

// Funciones para manipular datos
const prepareEditInvestment = (id: string) => {
  console.log("Preparando para editar inversión con ID:", id);
  const investment = investmentStore.investments.find((inv: any) => inv.id === id);
  if (investment) {
    editingInvestment.value = { ...investment };
    isEditModalOpen.value = true;
    console.log("Inversión para editar encontrada");
  } else {
    console.error("Inversión no encontrada para el ID:", id);
  }
};
const saveEditedInvestment = async () => {
  if (editingInvestment.value.id) {
    await investmentStore.updateInvestment(editingInvestment.value.id, editingInvestment.value);
    investments.value = investmentStore.investments;
    closeEditModal();
  } else {
    console.error("El ID de la inversión no está disponible.");
  }
};

const deleteInvestment = async (id: string) => {
  await investmentStore.deleteInvestment(id);
  investments.value = investmentStore.investments;
};

// Función de formateo de moneda
const formatCurrency = (value: number) => {
  if (isNaN(value)) return '$0.00';
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD' }).format(value);
};

const addNewInvestment = async () => {
  await investmentStore.addInvestment(newInvestment.value);
  investments.value = investmentStore.investments;
  closeAddModal();
};
</script>

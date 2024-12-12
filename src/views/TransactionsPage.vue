<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Transacciones</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-button expand="block" @click="showAddTransactionModal">AGREGAR TRANSACCIÓN</ion-button>

      <ion-list v-if="transactionStore.transactions.length > 0">
        <ion-item v-for="transaction in transactionStore.transactions" :key="transaction.id">
          <ion-card class="transaction-card">
            <ion-card-content>
              <p><strong>Descripción:</strong> {{ transaction.description }}</p>
              <p><strong>Monto:</strong> {{ formatCurrency(transaction.amount) }}</p>
              <p><strong>Tipo:</strong> {{ transaction.type }}</p>
              <p><strong>Fecha:</strong> {{ new Date(transaction.date).toLocaleDateString() }}</p>
              <div class="button-container">
                <ion-button expand="block" color="primary" @click="prepareEditTransaction(transaction.id)">
                  EDITAR
                </ion-button>
                <ion-button expand="block" color="danger" @click="deleteTransaction(transaction.id)">
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
            <ion-title>Editar Transacción</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="closeEditModal">CERRAR</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-item>
            <ion-label position="stacked">Descripción</ion-label>
            <ion-input v-model="editingTransaction.description" placeholder="Descripción de la transacción"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Monto</ion-label>
            <ion-input v-model.number="editingTransaction.amount" type="number" placeholder="Monto de la transacción"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Tipo</ion-label>
            <ion-select v-model="editingTransaction.type">
              <ion-select-option value="Ingreso">Ingreso</ion-select-option>
              <ion-select-option value="Gasto">Gasto</ion-select-option>
              <ion-select-option value="Impuesto">Impuesto</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Fecha</ion-label>
            <ion-datetime v-model="editingTransaction.date" display-format="DD/MM/YYYY"></ion-datetime>
          </ion-item>
          <ion-button expand="block" @click="saveEditedTransaction">GUARDAR CAMBIOS</ion-button>
        </ion-content>
      </ion-modal>

      <!-- Modal para agregar nueva transacción -->
      <ion-modal :is-open="isAddModalOpen">
        <ion-header>
          <ion-toolbar>
            <ion-title>Agregar Nueva Transacción</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="closeAddModal">CERRAR</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-item>
            <ion-label position="stacked">Descripción</ion-label>
            <ion-input v-model="newTransaction.description" placeholder="Descripción de la transacción"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Monto</ion-label>
            <ion-input v-model.number="newTransaction.amount" type="number" placeholder="Monto de la transacción"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Tipo</ion-label>
            <ion-select v-model="newTransaction.type">
              <ion-select-option value="Ingreso">Ingreso</ion-select-option>
              <ion-select-option value="Gasto">Gasto</ion-select-option>
              <ion-select-option value="Impuesto">Impuesto</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Fecha</ion-label>
            <ion-datetime v-model="newTransaction.date" display-format="DD/MM/YYYY"></ion-datetime>
          </ion-item>
          <ion-button expand="block" @click="addNewTransaction">AGREGAR TRANSACCIÓN</ion-button>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useTransactionStore } from '@/store/Transactions.js';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem,
  IonCard, IonCardContent, IonButton, IonModal, IonButtons, IonInput, IonLabel,
  IonSelect, IonSelectOption
} from '@ionic/vue';

// Usar el store de transacciones
const transactionStore = useTransactionStore(); 

const transactions = ref([]); // Array local para las transacciones

const isEditModalOpen = ref(false);
const isAddModalOpen = ref(false);
const transactionToEdit = ref<number | null>(null);
// Variables para los formularios de edición y agregar
const editingTransaction = ref({ description: '', amount: 0, type: '', date: new Date().toISOString() });
const newTransaction = ref({ description: '', amount: 0, type: '', date: new Date().toISOString() });
onMounted(async () => {
  await transactionStore.fetchTransactions(); // Obtener las inversiones desde el store
  console.log("Transacciones obtenidas"); // Verificar las inversiones
});

const closeEditModal = () => {
  isEditModalOpen.value = false;
  transactionToEdit.value = null;
};

const formatCurrency = (value: number) => {
  if (isNaN(value) || value === null) return '$0.00';
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD' }).format(value);
};

const showAddTransactionModal = () => {
  isAddModalOpen.value = true;
};

const closeAddModal = () => {
  isAddModalOpen.value = false;
  newTransaction.value = { description: '', amount: 0, type: '' };
};
// Funciones para manipular datos
const addNewTransaction = async () => {
  await transactionStore.addTransaction(newTransaction.value);
  transactions.value = transactionStore.transactions;
  closeAddModal();
};

const prepareEditTransaction = (id: string) => {
  console.log("Preparando para editar transaccion con ID:", id);
  const transaction = transactionStore.transactions.find((inv: any) => inv.id === id);
  if (transaction) {
    editingTransaction.value = { ...transaction };
    isEditModalOpen.value = true;
    console.log("transaccion para editar encontrada");
  } else {
    console.error("transaccion no encontrada para el ID:", id);
  }
};
const saveEditedTransaction = async () => {
  if (editingTransaction.value.id) {
    await transactionStore.updateTransaction(editingTransaction.value.id, editingTransaction.value);
    transactions.value = transactionStore.transactions;
    closeEditModal();
  } else {
    console.error("El ID de la transaccion no está disponible.");
  }
};

const deleteTransaction = async (id: string) => {
  await transactionStore.deleteTransaction(id);
  transactions.value = transactionStore.transactions;
};
</script>

<style scoped>
.transaction-card {
  width: 100%;
}

.button-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
}

ion-button {
  margin: 0;
}
</style>

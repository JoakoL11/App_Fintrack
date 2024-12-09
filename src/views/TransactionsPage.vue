<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Transacciones</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-button expand="block" @click="showAddTransactionModal">AGREGAR TRANSACCIÓN</ion-button>

      <ion-list v-if="transactions.length > 0">
        <ion-item v-for="(transaction, index) in transactions" :key="index">
          <ion-card class="transaction-card">
            <ion-card-content>
              <p><strong>Descripción:</strong> {{ transaction.description }}</p>
              <p><strong>Monto:</strong> {{ formatCurrency(transaction.amount) }}</p>
              <p><strong>Tipo:</strong> {{ transaction.type }}</p>
              
              <div class="button-container">
                <ion-button expand="block" color="primary" @click="prepareEditTransaction(index)">
                  EDITAR
                </ion-button>
                <ion-button expand="block" color="danger" @click="deleteTransaction(index)">
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
          <ion-button expand="block" @click="addNewTransaction">AGREGAR TRANSACCIÓN</ion-button>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { state } from '../state';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem,
  IonCard, IonCardContent, IonButton, IonModal, IonButtons, IonInput, IonLabel,
  IonSelect, IonSelectOption
} from '@ionic/vue';

const transactions = ref(state.transactions);

const isEditModalOpen = ref(false);
const isAddModalOpen = ref(false);
const transactionToEdit = ref<number | null>(null);
const editingTransaction = ref({
  description: '',
  amount: 0,
  type: ''
});
const newTransaction = ref({
  description: '',
  amount: 0,
  type: ''
});

onMounted(() => {
  if (!state.transactions) {
    state.transactions = [];
  }
  transactions.value = state.transactions;
});

const prepareEditTransaction = (index: number) => {
  transactionToEdit.value = index;
  editingTransaction.value = { ...transactions.value[index] };
  isEditModalOpen.value = true;
};

const saveEditedTransaction = () => {
  if (transactionToEdit.value !== null) {
    transactions.value[transactionToEdit.value] = { ...editingTransaction.value };
    state.transactions = [...transactions.value];
    closeEditModal();
  }
};

const closeEditModal = () => {
  isEditModalOpen.value = false;
  transactionToEdit.value = null;
};

const deleteTransaction = (index: number) => {
  transactions.value.splice(index, 1);
  state.transactions = [...transactions.value];
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

const addNewTransaction = () => {
  transactions.value.push({ ...newTransaction.value });
  state.transactions = [...transactions.value];
  closeAddModal();
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

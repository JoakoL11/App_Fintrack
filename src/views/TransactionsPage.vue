<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Transacciones</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- Filtrar por tipo -->
      <ion-item>
        <ion-label>Filtrar por tipo</ion-label>
        <ion-select v-model="filterType" @ionChange="filterTransactions">
          <ion-select-option value="Todos">Todos</ion-select-option>
          <ion-select-option value="Pago">Pago</ion-select-option>
          <ion-select-option value="Compra">Compra</ion-select-option>
          <ion-select-option value="Depósito">Depósito</ion-select-option>
        </ion-select>
      </ion-item>

      <!-- Formulario para agregar nueva transacción -->
      <ion-item>
        <ion-label position="stacked">Nombre de Transacción</ion-label>
        <ion-input v-model="newTransaction.concept" placeholder="Nombre de la Transacción" @input="validateField('concept')"></ion-input>
      </ion-item>
      <p v-if="errors.concept" class="error-message">El nombre de la transacción es obligatorio.</p>

      <ion-item>
        <ion-label position="stacked">Monto</ion-label>
        <ion-input v-model="newTransaction.amount" type="number" placeholder="Monto de la transacción" @input="validateField('amount')"></ion-input>
      </ion-item>
      <p v-if="errors.amount" class="error-message">El monto de la transacción es obligatorio y debe ser mayor a 0.</p>

      <ion-item>
        <ion-label position="stacked">Tipo</ion-label>
        <ion-select v-model="newTransaction.type" @ionChange="validateField('type')">
          <ion-select-option value="Pago">Pago</ion-select-option>
          <ion-select-option value="Compra">Compra</ion-select-option>
          <ion-select-option value="Depósito">Depósito</ion-select-option>
        </ion-select>
      </ion-item>
      <p v-if="errors.type" class="error-message">El tipo de transacción es obligatorio.</p>

      <ion-button expand="full" @click="addTransaction">Agregar Transacción</ion-button>

      <!-- Listado de transacciones -->
      <ion-list v-if="filteredTransactions.length > 0">
        <ion-item v-for="(transaction, index) in filteredTransactions" :key="index">
          <ion-card>
            <ion-card-header>
              <ion-card-title>{{ transaction.concept }}</ion-card-title>
              <ion-card-subtitle>{{ new Date(transaction.date).toLocaleString() }}</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <p><strong>Monto:</strong> {{ formatCurrency(transaction.amount) }}</p>
              <p><strong>Tipo:</strong> {{ transaction.type }}</p>
              <!-- Botón para eliminar transacción -->
              <ion-button color="danger" expand="block" @click="deleteTransaction(index)">Eliminar</ion-button>
            </ion-card-content>
          </ion-card>
        </ion-item>
      </ion-list>

      <!-- Mensaje cuando no hay transacciones -->
      <ion-item v-else>
        <ion-label>No hay transacciones registradas.</ion-label>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { state } from '../state';
import { ref } from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonButton,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent
} from '@ionic/vue';

// Filtro de tipo de transacción
const filterType = ref('Todos');
const filteredTransactions = ref(state.transactions);

// Nueva transacción a agregar
const newTransaction = ref({
  concept: '',
  amount: 0,
  type: '',
  date: new Date()
});

// Errores de validación
const errors = ref({
  concept: false,
  amount: false,
  type: false
});

// Función para agregar nueva transacción
const addTransaction = () => {
  // Limpiar errores previos
  errors.value.concept = false;
  errors.value.amount = false;
  errors.value.type = false;

  // Validar campos
  if (!newTransaction.value.concept) {
    errors.value.concept = true;
    hideErrorAfterTimeout('concept'); // Ocultar el mensaje después de 5 segundos
  }
  if (!newTransaction.value.amount || newTransaction.value.amount <= 0) {
    errors.value.amount = true;
    hideErrorAfterTimeout('amount'); // Ocultar el mensaje después de 5 segundos
  }
  if (!newTransaction.value.type) {
    errors.value.type = true;
    hideErrorAfterTimeout('type'); // Ocultar el mensaje después de 5 segundos
  }

  // Si hay algún error, no continuar
  if (errors.value.concept || errors.value.amount || errors.value.type) {
    return;
  }

  // Agregar la nueva transacción a la lista global
  state.transactions.push({
    ...newTransaction.value,
    date: new Date() // Con esta función se añade la fecha actual
  });

  // Limpiar el formulario
  newTransaction.value.concept = '';
  newTransaction.value.amount = 0;
  newTransaction.value.type = '';

  // Actualizar el filtro
  filterTransactions();
};

// Función para eliminar una transacción
const deleteTransaction = (index: number) => {
  state.transactions.splice(index, 1); // Eliminar de la lista global
  filterTransactions(); // Actualizar el filtro después de eliminar
};

// Función para filtrar las transacciones
const filterTransactions = () => {
  if (filterType.value === 'Todos') {
    filteredTransactions.value = state.transactions;
  } else {
    filteredTransactions.value = state.transactions.filter((transaction: { type: string; }) => transaction.type === filterType.value);
  }
};

// Función para formatear la moneda
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD' }).format(value);
};

// Función para validar campos en tiempo real
const validateField = (field: string) => {
  if (field === 'concept' && newTransaction.value.concept) {
    errors.value.concept = false;
  }
  if (field === 'amount' && newTransaction.value.amount > 0) {
    errors.value.amount = false;
  }
  if (field === 'type' && newTransaction.value.type) {
    errors.value.type = false;
  }
};

// Función para ocultar errores después de 5 segundos
const hideErrorAfterTimeout = (field: string) => {
  setTimeout(() => {
    errors.value[field] = false;
  }, 5000);
};
</script>

<style>
.error-message {
  color: red;
  font-size: 12px;
  margin-top: 1px;
  margin-bottom: 10px;
}
</style>

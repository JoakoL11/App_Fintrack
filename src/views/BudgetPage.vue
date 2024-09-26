<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Presupuesto</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- Formulario para agregar presupuesto -->
      <ion-item>
        <ion-label position="stacked">Descripción del Presupuesto</ion-label>
        <ion-input
          v-model="newBudget.description"
          placeholder="Descripción del presupuesto"
        ></ion-input>
      </ion-item>
      <p v-if="errors.description" class="error-message">{{ errors.description }}</p>

      <ion-item>
        <ion-label position="stacked">Monto</ion-label>
        <ion-input
          v-model.number="newBudget.amount"
          type="number"
          placeholder="Monto del presupuesto"
          @input="validateAmount"
        ></ion-input>
      </ion-item>
      <p v-if="errors.amount" class="error-message">{{ errors.amount }}</p>

      <ion-button expand="full" @click="addBudget">Agregar Presupuesto</ion-button>

      <!-- Lista de presupuestos -->
      <ion-list v-if="budgets.length > 0">
        <ion-item v-for="(budget, index) in budgets" :key="index">
          <ion-card>
            <ion-card-header>
              <ion-card-title>{{ budget.description }}</ion-card-title>
              <ion-card-subtitle>{{ new Date(budget.date).toLocaleString() }}</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <p><strong>Monto:</strong> {{ formatCurrency(budget.amount) }}</p>
              <ion-button color="danger" expand="block" @click="deleteBudget(index)">Eliminar</ion-button>
            </ion-card-content>
          </ion-card>
        </ion-item>
      </ion-list>

      <!-- Mensaje cuando no existe presupuesto -->
      <ion-item v-else>
        <ion-label>No hay presupuestos registrados.</ion-label>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { state } from '../state'; // Asegúrate de tener el path correcto

// Lista de presupuestos desde el estado global
const budgets = state.budgets;

// Nuevo presupuesto a agregar
const newBudget = ref({
  description: '',
  amount: 0,
  date: new Date()
});

// Errores de validación
const errors = ref({
  description: '',
  amount: ''
});

// Función para agregar presupuesto
const addBudget = () => {
  // Validación de campos
  if (!newBudget.value.description || newBudget.value.description.length < 5) {
    errors.value.description = 'La descripción debe tener al menos 5 caracteres.';
    return;
  } else {
    errors.value.description = '';
  }

  if (newBudget.value.amount <= 0) {
    errors.value.amount = 'El monto debe ser un número positivo.';
    return;
  } else {
    errors.value.amount = '';
  }

  // Agregar el nuevo presupuesto a la lista global de presupuestos
  budgets.push({
    ...newBudget.value,
    date: new Date() // con esto se añade la fecha actual
  });

  // Limpiar el formulario
  newBudget.value.description = '';
  newBudget.value.amount = 0; // Reseteamos a 0
};

// Función para validar el monto
const validateAmount = () => {
  if (newBudget.value.amount < 0) {
    errors.value.amount = 'El monto no puede ser negativo.';
  } else {
    errors.value.amount = '';
  }
};

// Función para eliminar presupuesto
const deleteBudget = (index) => {
  budgets.splice(index, 1);
};

// Función para formatear la moneda
const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD' }).format(value);
};
</script>

<style scoped>
ion-card {
  margin-bottom: 15px;
}
.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}
</style>

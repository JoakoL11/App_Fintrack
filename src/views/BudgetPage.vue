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
          @ionInput="validateField('description')"
        ></ion-input>
      </ion-item>
      <p v-if="errors.description" class="error-message">Por favor ingresa una descripción válida.</p>

      <ion-item>
        <ion-label position="stacked">Monto</ion-label>
        <ion-input
          v-model.number="newBudget.amount"
          type="number"
          placeholder="Monto del presupuesto"
          @ionInput="validateField('amount')"
        ></ion-input>
      </ion-item>
      <p v-if="errors.amount" class="error-message">El monto debe ser mayor a 0.</p>

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
import { state } from '../state'; 

// Importa todos los componentes de Ionic que utilizas
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent
} from '@ionic/vue';

// Lista de presupuestos desde el estado global
const budgets = ref(state.budgets || []);

// Nuevo presupuesto a agregar
const newBudget = ref({
  description: '',
  amount: 0,
  date: new Date()
});

// Errores de validación
const errors = ref({
  description: false,
  amount: false
});

// Función para agregar presupuesto
const addBudget = () => {
  // Limpiar errores previos
  errors.value.description = false;
  errors.value.amount = false;

  // Validar campos
  if (!newBudget.value.description.trim()) {
    errors.value.description = true;
  }
  if (newBudget.value.amount <= 0 || isNaN(newBudget.value.amount)) {
    errors.value.amount = true;
  }

  // Si hay errores, no continuar
  if (errors.value.description || errors.value.amount) {
    return;
  }

  // Agregar el nuevo presupuesto a la lista global de presupuestos
  budgets.value.push({
    ...newBudget.value,
    date: new Date() // Añadir la fecha actual
  });

  // Limpiar el formulario
  newBudget.value = {
    description: '',
    amount: 0,
    date: new Date()
  };
};

// Función para eliminar presupuesto
const deleteBudget = (index) => {
  budgets.value.splice(index, 1);
};

// Función para formatear la moneda
const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD' }).format(value);
};

// Función para validar campos en tiempo real
const validateField = (field) => {
  if (field === 'description' && newBudget.value.description.trim()) {
    errors.value.description = false;
  }
  if (field === 'amount' && newBudget.value.amount > 0 && !isNaN(newBudget.value.amount)) {
    errors.value.amount = false;
  }
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

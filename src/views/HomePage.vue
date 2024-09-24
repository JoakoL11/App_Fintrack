<template>
  <ion-page>
    <ion-content class="ion-padding">
      <h1>Bienvenido a FinTrack</h1>
      
      <div class="summary">
        <h2>Resumen Financiero</h2>
        <div class="balance">
          <h3>Saldo Total:</h3>
          <p>{{ formatCurrency(totalBalance) }}</p>
        </div>
        <div class="expenses">
          <h3>Gastos Totales:</h3>
          <p>{{ formatCurrency(totalExpenses) }}</p>
        </div>
        <div class="income">
          <h3>Ingresos Totales:</h3>
          <p>{{ formatCurrency(totalIncome) }}</p>
        </div>
      </div>

      <div class="quick-access">
        <h2>Acceso Rápido</h2>
        <ion-button @click="navigateToTransactions">Agregar Transacción</ion-button>
        <ion-button @click="navigateToBudget">Configurar Presupuesto</ion-button>
        <ion-button @click="navigateToReports">Ver Reportes</ion-button>
      </div>

      <div class="notifications">
        <h2>Notificaciones</h2>
        <p>No olvides pagar tu factura de electricidad esta semana.</p>
      </div>

      <ion-list>
        <h2>Transacciones Recientes</h2>
        <ion-item v-for="transaction in recentTransactions" :key="transaction.id">
          <ion-label>
            <h2>{{ transaction.description }}</h2>
            <p>{{ formatDate(transaction.date) }}</p>
            <p>{{ formatCurrency(transaction.amount) }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonContent, IonButton, IonLabel, IonItem, IonList } from '@ionic/vue';

const router = useRouter();

const totalBalance = ref(500000); // Cambia esto por el valor real
const totalExpenses = ref(20000); // Cambia esto por el valor real
const totalIncome = ref(100000); // Cambia esto por el valor real

const recentTransactions = ref([
  { id: 1, description: 'Compra de comida', amount: -5000, date: '2024-09-20' },
  { id: 2, description: 'Pago de salario', amount: 200000, date: '2024-09-19' },
]);

function navigateToTransactions() {
  router.push({ name: 'Transactions' });
}

function navigateToBudget() {
  router.push({ name: 'Budget' });
}

function navigateToReports() {
  router.push({ name: 'Reports' });
}

// Función para formatear números como moneda
function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(value);
}

// Función para formatear fechas
function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Intl.DateTimeFormat('es-CL', options).format(new Date(dateString));
}
</script>

<style scoped>
.summary {
  margin-bottom: 20px;
}
.quick-access {
  margin: 20px 0;
}
.notifications {
  margin: 20px 0;
}
ion-item {
  margin-bottom: 10px;
}
</style>
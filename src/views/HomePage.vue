<template>
  <ion-page class="home-page">
    <ion-content class="ion-padding">
      <h1 class="welcome-title">Bienvenido a FinTrack</h1>
      
      <div class="summary">
        <h2>Resumen Financiero</h2>
        <div class="balance-card">
          <h3>Saldo Total:</h3>
          <p>{{ formatCurrency(totalBalance) }}</p>
        </div>
        <div class="expenses-card">
          <h3>Gastos Totales:</h3>
          <p>{{ formatCurrency(totalExpenses) }}</p>
        </div>
        <div class="income-card">
          <h3>Ingresos Totales:</h3>
          <p>{{ formatCurrency(totalIncome) }}</p>
        </div>
      </div>

      <div class="quick-access">
        <h2>Acceso Rápido</h2>
        <ion-button class="quick-button" @click="navigateToTransactions">Agregar Transacción</ion-button>
        <ion-button class="quick-button" @click="navigateToBudget">Configurar Presupuesto</ion-button>
        <ion-button class="quick-button" @click="navigateToReports">Ver Reportes</ion-button>
      </div>

      <div class="notifications">
        <h2>Notificaciones</h2>
        <p>No olvides pagar tu factura de electricidad esta semana.</p>
      </div>

      <ion-list>
        <h2>Transacciones Recientes</h2>
        <ion-item v-for="transaction in recentTransactions" :key="transaction.id" class="transaction-item">
          <ion-label>
            <h2>{{ transaction.description }}</h2>
            <p class="transaction-date">{{ formatDate(transaction.date) }}</p>
            <p class="transaction-amount">{{ formatCurrency(transaction.amount) }}</p>
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
//  IMPORTANTE ANTES DE ENTREGAR HACER CASO A NOTAS ABAJO
//  IMPORTANTE ANTES DE ENTREGAR HACER CASO A NOTAS ABAJO
//  IMPORTANTE ANTES DE ENTREGAR HACER CASO A NOTAS ABAJO

const totalBalance = ref(500000);// Ccmbiar esto por el valor real
const totalExpenses = ref(20000);// cambiar esto por el valor real
const totalIncome = ref(100000); // cambiar esto por el valor real

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
.home-page {
  background-color: #f9f9f9;
}

.welcome-title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 24px;
  color: #333;
}

/* Estilo para la sección de Resumen Financiero */
.summary {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.balance-card, .expenses-card, .income-card {
  background: rgb(209, 209, 209);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  flex: 1 1 30%; /* Flexbox para tres columnas en pantallas grandes */
  margin: 10px; /* Espaciado entre las tarjetas */
}

.balance-card h3,
.expenses-card h3,
.income-card h3 {
  color: #4CAF50;
}

/* Estilo para Acceso Rápido */
.quick-access {
  margin: 20px 0;
}

.quick-button {
  margin: 5px;
}

/* Estilo para Notificaciones */
.notifications {
  background: #fff3cd;
  border-radius: 8px;
  padding: 15px;
  margin: 20px 0;
  color: #856404;
}

/* Estilo para la lista de transacciones recientes */
.transaction-item {
  margin-bottom: 10px;
  padding: 10px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.transaction-date {
  font-size: 14px;
  color: #666;
}

.transaction-amount {
  font-weight: bold;
}
</style>

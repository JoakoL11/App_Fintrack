<template>
  <ion-page class="home-page">
    <ion-content class="ion-padding" style="--background: url('https://s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2018/01/24115423/Economia-Day-5.jpg') no-repeat center center / cover;">
      <div class="title-container">
        <h1 class="welcome-title">Bienvenido a FinTrack</h1>
      </div>
      
      <div class="summary">
        <div class="title-container">
          <h2>Resumen Financiero</h2>
        </div>
        <ion-card class="summary-card">
          <ion-card class="financial-card">
            <h3>Saldo Total:</h3>
            <p>{{ formatCurrency(totalBalance) }}</p>
          </ion-card>
          <ion-card class="financial-card">
            <h3>Gastos Totales:</h3>
            <p>{{ formatCurrency(totalExpenses) }}</p>
          </ion-card>
          <ion-card class="financial-card">
            <h3>Ingresos Totales:</h3>
            <p>{{ formatCurrency(totalIncome) }}</p>
          </ion-card>
        </ion-card>
      </div>

      <div class="quick-access">
        <div class="title-container">
          <h2>Acceso Rápido</h2>
        </div>
        <div class="button-container">
          <ion-button class="quick-button" @click="navigateToTransactions">Agregar Transacción</ion-button>
          <ion-button class="quick-button" @click="navigateToBudget">Configurar Presupuesto</ion-button>
          <ion-button class="quick-button" @click="navigateToReports">Ver Reportes</ion-button>
        </div>
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
import { IonContent, IonButton, IonLabel, IonItem, IonList, IonCard } from '@ionic/vue';

const router = useRouter();

const totalBalance = ref(500000); // Cambiar esto por el valor real
const totalExpenses = ref(20000); // Cambiar esto por el valor real
const totalIncome = ref(100000); // Cambiar esto por el valor real

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
  background-color: #f4f4f4;
  font-family: 'Arial', sans-serif; /* Cambia la tipografía a algo más limpio */
}

.title-container {
  background-color: rgba(255, 255, 255, 0.8); /* Fondo blanco semi-transparente */
  border-radius: 8px;
  padding: 5px 10px; /* Espaciado ajustado */
  margin: 10px auto; /* Espaciado entre títulos y centrado */
  display: inline-block; /* Ajusta el contenedor al tamaño del texto */
  text-align: center; /* Centrar texto dentro del contenedor */
}

.welcome-title {
  font-size: 28px;
  color: #2c3e50; /* Color más oscuro */
}

/* Estilo para la sección de Resumen Financiero */
.summary {
  margin-bottom: 20px;
  text-align: center; /* Cambiado a centro */
}

.summary-card {
  display: flex;
  flex-wrap: wrap; /* Permitir que las tarjetas se ajusten */
  justify-content: space-between; /* Espaciado entre tarjetas */
  margin-top: 10px;
}

.financial-card {
  flex: 1 1 30%; /* Toma hasta el 30% del ancho */
  padding: 15px;
  margin: 10px; /* Espaciado entre las tarjetas */
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* Estilo responsivo para pantallas pequeñas */
@media (max-width: 768px) {
  .financial-card {
    flex: 1 1 100%; /* En pantallas pequeñas, las tarjetas toman el 100% del ancho */
  }
}

.financial-card h3 {
  color: #3498db; /* Color azul para los encabezados */
}

/* Estilo para Acceso Rápido */
.quick-access {
  margin: 20px 0;
  text-align: center; /* Centrar todo en el contenedor de acceso rápido */
}

.button-container {
  display: flex;
  justify-content: center; /* Centrar botones */
  flex-wrap: wrap; /* Permitir que los botones se ajusten */
}

.quick-button {
  margin: 5px;
  background-color: #3498db; /* Color de fondo para los botones */
  color: white;
  transition: background-color 0.3s;
}

.quick-button:hover {
  background-color: #2980b9; /* Color más oscuro al pasar el mouse */
}

/* Estilo para Notificaciones */
.notifications {
  background: #ffecb3; /* Color más claro */
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

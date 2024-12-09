<template>
  <ion-page class="home-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>FinTrack</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content class="ion-padding" color="background">
      <div class="welcome-section">
        <h1>Bienvenido a FinTrack</h1>
        <p class="subtitle">Tu asistente personal para el control financiero</p>
      </div>
      <ion-card class="summary-card">
        <ion-card-header>
          <ion-card-title>Resumen Financiero</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <div class="summary-item">
            <ion-icon :icon="walletOutline" color="primary"></ion-icon>
            <div class="summary-text">
              <h2>Saldo Total</h2>
              <p>{{ formatCurrency(totalBalance) }}</p>
            </div>
          </div>
          <div class="summary-item">
            <ion-icon :icon="trendingDownOutline" color="danger"></ion-icon>
            <div class="summary-text">
              <h2>Gastos Totales</h2>
              <p>{{ formatCurrency(totalExpenses) }}</p>
            </div>
          </div>
          <div class="summary-item">
            <ion-icon :icon="trendingUpOutline" color="success"></ion-icon>
            <div class="summary-text">
              <h2>Ingresos Totales</h2>
              <p>{{ formatCurrency(totalIncome) }}</p>
            </div>
          </div>
        </ion-card-content>
      </ion-card>

      <ion-card class="quick-access-card">
        <ion-card-header>
          <ion-card-title>Acceso Rápido</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-button expand="block" @click="navigateToTransactions">
            <ion-icon slot="start" :icon="addCircleOutline"></ion-icon>
            Agregar Transacción
          </ion-button>
          <ion-button expand="block" @click="navigateToBudget">
            <ion-icon slot="start" :icon="calculatorOutline"></ion-icon>
            Configurar Presupuesto
          </ion-button>
          <ion-button expand="block" @click="navigateToReports">
            <ion-icon slot="start" :icon="barChartOutline"></ion-icon>
            Ver Reportes
          </ion-button>
        </ion-card-content>
      </ion-card>

      <ion-card class="recent-transactions-card">
        <ion-card-header>
          <ion-card-title>Transacciones Recientes</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <ion-item v-for="transaction in recentTransactions" :key="transaction.id">
              <ion-label>
                <h2>{{ transaction.description }}</h2>
                <p>{{ formatDate(transaction.date) }}</p>
              </ion-label>
              <ion-note slot="end" :color="transaction.amount < 0 ? 'danger' : 'success'">
                {{ formatCurrency(transaction.amount) }}
              </ion-note>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
      <ion-button @click="goToAbout">Acerca de</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, 
  IonCardTitle, IonCardContent, IonButton, IonIcon, IonList, IonItem, IonLabel, IonNote 
} from '@ionic/vue';
import { 
  walletOutline, trendingDownOutline, trendingUpOutline, addCircleOutline, 
  calculatorOutline, barChartOutline 
} from 'ionicons/icons';

const router = useRouter();

const totalBalance = ref(500000);
const totalExpenses = ref(20000);
const totalIncome = ref(100000);

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

function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(value);
}

function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Intl.DateTimeFormat('es-CL', options).format(new Date(dateString));
}

const goToAbout = () => {
  router.push('/about');
};
</script>

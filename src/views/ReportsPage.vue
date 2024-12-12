<template>
  <ion-page class="reports-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>Reportes Financieros</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card class="filter-card">
        <ion-card-content>
          <ion-item>
            <ion-label position="stacked">Rango de fechas</ion-label>
            <ion-select v-model="dateRange" interface="popover">
              <ion-select-option value="week">Última semana</ion-select-option>
              <ion-select-option value="month">Último mes</ion-select-option>
              <ion-select-option value="year">Último año</ion-select-option>
              <ion-select-option value="custom">Personalizado</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item v-if="dateRange === 'custom'">
            <ion-label position="stacked">Fecha inicial</ion-label>
            <ion-datetime display-format="DD/MM/YYYY" v-model="startDate"></ion-datetime>
          </ion-item>
          <ion-item v-if="dateRange === 'custom'">
            <ion-label position="stacked">Fecha final</ion-label>
            <ion-datetime display-format="DD/MM/YYYY" v-model="endDate"></ion-datetime>
          </ion-item>
          <ion-button expand="block" @click="generateReport">Generar Reporte</ion-button>
        </ion-card-content>
      </ion-card>

      <ion-card class="summary-card">
        <ion-card-header>
          <ion-card-title>Resumen Financiero</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <div class="summary-item">
            <ion-icon :icon="trendingUpOutline" color="success"></ion-icon>
            <div class="summary-text">
              <h3>Ingresos Totales</h3>
              <p>{{ formatCurrency(totalIncome) }}</p>
            </div>
          </div>
          <div class="summary-item">
            <ion-icon :icon="trendingDownOutline" color="danger"></ion-icon>
            <div class="summary-text">
              <h3>Gastos Totales</h3>
              <p>{{ formatCurrency(totalExpenses) }}</p>
            </div>
          </div>
          <div class="summary-item">
            <ion-icon :icon="walletOutline" color="primary"></ion-icon>
            <div class="summary-text">
              <h3>Balance</h3>
              <p>{{ formatCurrency(totalIncome - totalExpenses) }}</p>
            </div>
          </div>
        </ion-card-content>
      </ion-card>

      <ion-card class="chart-card">
        <ion-card-header>
          <ion-card-title>Balance de Transacciones</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <BalanceChart :transactions="transactionStore.transactions" />
        </ion-card-content>
      </ion-card>

      <ion-card class="transactions-card">
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
              <ion-note slot="end" :color="getTransactionColor(transaction)">
                {{ formatCurrency(transaction.amount) }}
              </ion-note>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>

      <ion-toast
        :is-open="showToast"
        :message="toastMessage"
        :duration="2000"
        @didDismiss="showToast = false"
      ></ion-toast>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, 
  IonCardTitle, IonCardContent, IonItem, IonLabel, IonSelect, IonSelectOption, 
  IonDatetime, IonButton, IonIcon, IonList, IonNote, IonToast
} from '@ionic/vue';
import { 
  trendingUpOutline, trendingDownOutline, walletOutline
} from 'ionicons/icons';
import { useTransactionStore } from '@/store/Transactions.js';
import BalanceChart from '@/components/BalanceChart.vue';
interface Transaction {
  id: number;
  description: string;
  amount: number;
  date: string;
  type: 'Ingreso' | 'Gasto' | 'Impuesto';
}
const dateRange = ref('month');
const startDate = ref('');
const endDate = ref('');
const showToast = ref(false);
const toastMessage = ref('');

const totalIncome = ref(0);
const totalExpenses = ref(0);

const transactionStore = useTransactionStore();


const recentTransactions = ref<Transaction[]>([]);

onMounted(async () => {
  await transactionStore.fetchTransactions();
  generateReport();
});

const generateReport = () => {
  let filteredTransactions: Transaction[] = [];
  const currentDate = new Date();
  
  switch(dateRange.value) {
    case 'week':
      const oneWeekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
      filteredTransactions = transactionStore.transactions.filter((t: Transaction) => new Date(t.date) >= oneWeekAgo);
      break;
    case 'month':
      const oneMonthAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
      filteredTransactions = transactionStore.transactions.filter((t: Transaction) => new Date(t.date) >= oneMonthAgo);
      break;
    case 'year':
      const oneYearAgo = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());
      filteredTransactions = transactionStore.transactions.filter((t: Transaction) => new Date(t.date) >= oneYearAgo);
      break;
    case 'custom':
      if (startDate.value && endDate.value) {
        filteredTransactions = transactionStore.transactions.filter((t: Transaction) => 
          new Date(t.date) >= new Date(startDate.value) && 
          new Date(t.date) <= new Date(endDate.value)
        );
      }
      break;
  }
  
  totalIncome.value = filteredTransactions.filter((t: Transaction) => t.type === 'Ingreso').reduce((sum, t) => sum + t.amount, 0);
  totalExpenses.value = Math.abs(filteredTransactions.filter((t: Transaction) => t.type === 'Gasto' || t.type === 'Impuesto').reduce((sum, t) => sum + t.amount, 0));
  
  recentTransactions.value = filteredTransactions.slice(-5).reverse();
  toastMessage.value = `Reporte generado para: ${dateRange.value}`;
  showToast.value = true;
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(value);
};

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-CL', options);
};

const getTransactionColor = (transaction: Transaction) => {
  return transaction.type === 'Gasto' || transaction.type === 'Impuesto' ? 'danger' : 'success';
};
</script>
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Informes</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- informe de transacciones -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>Informe de Transacciones</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ul>
            <li v-for="(transaction, index) in transactions" :key="index">
              {{ new Date(transaction.date).toLocaleString() }} - {{ transaction.concept }}: {{ formatCurrency(transaction.amount) }}
            </li>
          </ul>
        </ion-card-content>
      </ion-card>

      <!-- informe de inversiones -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>Informe de Inversiones</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ul>
            <li v-for="(investment, index) in investments" :key="index">
              {{ new Date(investment.date).toLocaleString() }} - {{ investment.name }}: {{ formatCurrency(investment.amount) }}
            </li>
          </ul>
        </ion-card-content>
      </ion-card>

      <!-- informe de presupuesto -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>Informe de Presupuesto</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ul>
            <li v-for="(budget, index) in budgets" :key="index">
              {{ new Date(budget.date).toLocaleString() }} - {{ budget.description }}: {{ formatCurrency(budget.amount) }}
            </li>
          </ul>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { state } from '../state'; 
// presupuestos, transacciones, inversiones
const transactions = state.transactions;
const investments = state.investments;
const budgets = state.budgets; 

// formato moneda
const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD' }).format(value);
};
</script>

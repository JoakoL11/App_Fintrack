<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Inversiones</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- formulario para agregar una nueva inversión -->
      <ion-item>
        <ion-label position="stacked">Nombre de la Inversión</ion-label>
        <ion-input v-model="newInvestment.name" placeholder="Nombre de la Inversión"></ion-input>
      </ion-item>

      <ion-item>
        <ion-label position="stacked">Monto</ion-label>
        <ion-input v-model="newInvestment.amount" type="number" placeholder="Monto de la inversión"></ion-input>
      </ion-item>

      <ion-item>
        <ion-label position="stacked">Tipo</ion-label>
        <ion-select v-model="newInvestment.type">
          <ion-select-option value="Acciones">Acciones</ion-select-option>
          <ion-select-option value="Bonos">Bonos</ion-select-option>
          <ion-select-option value="Inmobiliaria">Inmobiliaria</ion-select-option>
        </ion-select>
      </ion-item>

      <ion-button expand="full" @click="addInvestment">Agregar Inversión</ion-button>

      <!-- lista de inversiones -->
      <ion-list v-if="investments.length > 0">
        <ion-item v-for="(investment, index) in investments" :key="index">
          <ion-card>
            <ion-card-header>
              <ion-card-title>{{ investment.name }}</ion-card-title>
              <ion-card-subtitle>{{ new Date(investment.date).toLocaleString() }}</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <p><strong>Monto:</strong> {{ formatCurrency(investment.amount) }}</p>
              <p><strong>Tipo:</strong> {{ investment.type }}</p>


              <!-- botón para eliminar inversión -->
              <ion-button color="danger" expand="block" @click="deleteInvestment(index)">Eliminar</ion-button>
            </ion-card-content>
          </ion-card>
        </ion-item>
      </ion-list>

      <!-- mensaje cuando no hay inversiones -->
      <ion-item v-else>
        <ion-label>No hay inversiones registradas.</ion-label>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { state } from '../state'; 
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

// nueva inversión a agregar
const newInvestment = ref({
  name: '',
  amount: 0,
  type: '',
  date: new Date()
});

// funcion para agregar una nueva inversion
const addInvestment = () => {
  if (!newInvestment.value.name || !newInvestment.value.amount || !newInvestment.value.type) {
    alert('Por favor completa todos los campos.');
    return;
  }

  // aregar una nueva inversion
  state.investments.push({
    ...newInvestment.value,
    date: new Date() // se coloca la fecha actual
  });

  // limpiar el formulario
  newInvestment.value.name = '';
  newInvestment.value.amount = 0;
  newInvestment.value.type = '';
};

// Función para eliminar una inversión
const deleteInvestment = (index: number) => {
  state.investments.splice(index, 1); // con esto se elimina de la lista de inversion NO LA BORREN
};

// funcion para formatear la moneda
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD' }).format(value);
};

const investments = state.investments;
</script>

<style scoped>
ion-card {
  margin-bottom: 15px;
}

</style>

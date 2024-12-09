<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Acerca de FinTrack</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>FinTrack</ion-card-title>
          <ion-card-subtitle>Tu asistente financiero personal</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <p>FinTrack es una aplicación diseñada para ayudarte a controlar tus finanzas personales de manera fácil y eficiente.</p>
          <p>Versión: 1.0.0</p>
          <p>Desarrollado por: Darwin waterson</p>
        </ion-card-content>
      </ion-card>
      
      <ion-card>
        <ion-card-header>
          <ion-card-title>Características principales</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <ion-item>
              <ion-icon :icon="walletOutline" slot="start"></ion-icon>
              <ion-label>Control de gastos e ingresos</ion-label>
            </ion-item>
            <ion-item>
              <ion-icon :icon="pieChartOutline" slot="start"></ion-icon>
              <ion-label>Presupuestos personalizados</ion-label>
            </ion-item>
            <ion-item>
              <ion-icon :icon="barChartOutline" slot="start"></ion-icon>
              <ion-label>Informes y estadísticas</ion-label>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, 
         IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonLabel, 
         IonIcon, IonButtons, IonBackButton } from '@ionic/vue';
import { walletOutline, pieChartOutline, barChartOutline } from 'ionicons/icons';
</script>



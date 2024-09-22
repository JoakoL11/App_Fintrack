<template>
    <ion-menu content-id="main-content" @ionWillOpen="setMenuOpen(true)" @ionWillClose="setMenuOpen(false)">
      <ion-header>
        <ion-toolbar>
          <ion-title>Menú</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-list>
<!--eliminar login y colocar como un componente-->
          <ion-item button @click="navigateTo('/login')">
            <ion-thumbnail slot="start">
              <img alt="Login" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
            </ion-thumbnail>
            <ion-label>Login</ion-label>
          </ion-item>


          <ion-item button @click="navigateTo('/home')">
            <ion-thumbnail slot="start">
              <img alt="Inicio" src="C:\Users\Alumno\Downloads\new\img\inicio.png" />
            </ion-thumbnail>
            <ion-label>Inicio</ion-label>
          </ion-item>


          <ion-item button @click="navigateTo('/investment')">
            <ion-thumbnail slot="start">
              <img alt="Investments" src="C:\Users\Alumno\Downloads\new\img\investment.png" />
            </ion-thumbnail>
            <ion-label>inversion</ion-label>
          </ion-item>

          <ion-item button @click="navigateTo('/budget')">
            <ion-thumbnail slot="start">
              <img alt="Investments" src="C:\Users\Alumno\Downloads\new\img\budget.png" />
            </ion-thumbnail>
            <ion-label>presupuesto</ion-label>
          </ion-item>


          <ion-item button @click="navigateTo('/transactions')">
            <ion-thumbnail slot="start">
              <img alt="Transactions" src="C:\Users\Alumno\Downloads\new\img\transactions.png" />
            </ion-thumbnail>
            <ion-label>Transacciones</ion-label>
          </ion-item>

        
          <ion-item button @click="navigateTo('/reports')">
            <ion-thumbnail slot="start">
              <img alt="Repots" src="C:\Users\Alumno\Downloads\new\img\reports.png" />
            </ion-thumbnail>
            <ion-label>Reportes</ion-label>
          </ion-item>

        </ion-list>
      </ion-content>
    </ion-menu>
  
    <ion-page id="main-content" :class="{ 'menu-open': isMenuOpen }">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-title>Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <router-view></router-view>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonThumbnail, IonLabel } from '@ionic/vue';
  
  const router = useRouter();
  const isMenuOpen = ref(false);
  
  function navigateTo(path: string) {
    router.push(path);
  }
  
  function setMenuOpen(open: boolean) {
    isMenuOpen.value = open;
  }
  </script>
  
  <style scoped>
    ion-item {
      --padding-start: 0;
    }
  
    /* Estilo para cuando el menú está abierto */
    .menu-open {
      background-color: rgba(48, 2, 2, 0.205); /* Color de fondo de la página cuando el menú está abierto */
      transition: background-color 0.3s ease; /* Transición suave */
    }
  
    /* Estilo del menú */
    ion-menu {
      --background: #d60e0e; /* Fondo del menú */
      --color: #070bff; /* Color del texto del menú */
    }
  
    /* Opcional: estilo adicional para el contenido del menú */
    ion-menu .ion-content {
      --padding-start: 16px; /* Espaciado a la izquierda del contenido del menú */
    }
  
    /* Estilo, letra y fonde de lista */
    ion-menu ion-item {
      --background: #ffffff; /* Fondo de los ítems del menú */
      --color: #093a36; /* Color del texto de los ítems del menú */
    }
  
    ion-menu ion-item:hover {
      --background: #20a3b48f; /* Fondo de los ítems del menú al pasar el ratón */
    }
  </style>
  
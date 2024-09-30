<template>
  <ion-menu content-id="main-content" @ionWillOpen="setMenuOpen(true)" @ionWillClose="setMenuOpen(false)">
    <ion-header>
      <ion-toolbar>
        <ion-title>Menú</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list>


        <ion-item button @click="navigateTo('/home')">
          <ion-thumbnail slot="start">
            <img alt="Inicio" src="..\..\img\inicio.png" />
          </ion-thumbnail>
          <ion-label>Inicio</ion-label>
        </ion-item>


        <ion-item button @click="navigateTo('/investment')">
          <ion-thumbnail slot="start">
            <img alt="Investments" src="..\..\\img\inversion.png" />
          </ion-thumbnail>
          <ion-label>Inversion</ion-label>
        </ion-item>

        <ion-item button @click="navigateTo('/budget')">
          <ion-thumbnail slot="start">
            <img alt="Investments" src="..\..\\img\presupuesto.png" />
          </ion-thumbnail>
          <ion-label>Presupuesto</ion-label>
        </ion-item>


        <ion-item button @click="navigateTo('/transactions')">
          <ion-thumbnail slot="start">
            <img alt="Transactions" src="..\..\\img\transaccion.png" />
          </ion-thumbnail>
          <ion-label>Transacciones</ion-label>
        </ion-item>

      
        <ion-item button @click="navigateTo('/reports')">
          <ion-thumbnail slot="start">
            <img alt="Repots" src="..\..\\img\reports.png" />
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
        <ion-buttons slot="end">
          <ion-button @click="navigateTo('/login')">
            <img alt="User" src="..\..\\img\perfil.png" style="width: 24px; height: 24px;" />
            <ion-label>Login</ion-label>
          </ion-button>
          <ion-button @click="navigateTo('/profile')">
            <img alt="Profile" src="..\..\\img\perfil.png" style="width: 24px; height: 24px;" />
            <ion-label>Perfil</ion-label>
          </ion-button>
        </ion-buttons>
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

  /* estilo para cuando el menu esta abierto */
  .menu-open {
    background-color: rgba(48, 2, 2, 0.205); /* color fondo pagina cuando el menu esta abierto */
    backdrop-filter: blur(15px); /* intente de hacer que el fondo se desenfoque, si no funciona del todo bien borrar backdrop-filter de abajito*/
    transition: background-color 0.3s ease, backdrop-filter 0.3s ease;/* aqui el backdrop-filter y cerrar en "ease;"*/
  }

  /* estilo del menu */
  ion-menu {
    --background: #d60e0e; /* fondo menu */
    --color: #070bff; /* color texto del menu */
  }

  ion-menu .ion-content {
    --padding-start: 16px;
  }

  /* estilo, letra y fondo de lista */
  ion-menu ion-item {
    --background: #ffffff; /* fondo de los items del menu */
    --color: #093a36; /* color del texto de los items del menu */
  }

  ion-menu ion-item:hover {
    --background: #20a3b48f; /* fondo ítems del menu al pasar el mouse */
  }
</style>
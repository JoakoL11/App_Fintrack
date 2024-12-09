<template>
  <ion-menu content-id="main-content" @ionWillOpen="setMenuOpen(true)" @ionWillClose="setMenuOpen(false)">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title class="ion-text-center">
          <strong>FinTrack</strong>
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list lines="none">
        <ion-menu-toggle :auto-hide="false" v-for="(p, i) in appPages" :key="i">
          <ion-item
            @click="navigateTo(p.url)"
            :class="{ 'selected-item': currentRoute === p.url }"
            :detail="false"
            router-direction="root"
            :router-link="p.url"
          >
            <ion-icon slot="start" :icon="p.icon"></ion-icon>
            <ion-label>{{ p.title }}</ion-label>
          </ion-item>
        </ion-menu-toggle>
      </ion-list>
      <ion-list>
        <ion-item v-if="isAuthenticated" router-link="/home">Inicio</ion-item>
        <ion-item v-if="isAuthenticated" router-link="/profile">Perfil</ion-item>
        <ion-item v-else router-link="/login">Iniciar Sesión</ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>

  <ion-page id="main-content" :class="{ 'menu-open': isMenuOpen }">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>{{ pageTitle }}</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="navigateTo('/profile')">
            <ion-avatar>
              <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
            </ion-avatar>
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
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getAuth } from 'firebase/auth';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonAvatar,
  IonMenuToggle,
  IonButton,
} from '@ionic/vue';
import {
  homeOutline,
  trendingUpOutline,
  walletOutline,
  swapHorizontalOutline,
  barChartOutline,
} from 'ionicons/icons';

// Variables y computadas
const router = useRouter();
const route = useRoute();
const isMenuOpen = ref(false);

const currentRoute = computed(() => route.path);

const pageTitle = computed(() => {
  const titles: { [key: string]: string } = {
    '/home': 'Inicio',
    '/investment': 'Inversiones',
    '/budget': 'Presupuesto',
    '/transactions': 'Transacciones',
    '/reports': 'Informes',
    '/profile': 'Perfil',
  };
  return titles[route.path] || 'FinTrack';
});

const appPages = [
  { title: 'Inicio', url: '/home', icon: homeOutline },
  { title: 'Inversiones', url: '/investment', icon: trendingUpOutline },
  { title: 'Presupuesto', url: '/budget', icon: walletOutline },
  { title: 'Transacciones', url: '/transactions', icon: swapHorizontalOutline },
  { title: 'Informes', url: '/reports', icon: barChartOutline },
];

function navigateTo(path: string) {
  router.push(path);
}

function setMenuOpen(open: boolean) {
  isMenuOpen.value = open;
}

const isAuthenticated = computed(() => {
  const auth = getAuth();
  return !!auth.currentUser; // Verifica si el usuario está autenticado
});
</script>

<style scoped>
ion-menu {
  --ion-background-color: var(--ion-color-light);
  --ion-text-color: var(--ion-color-dark);
  --ion-border-color: var(--ion-color-medium);
}

ion-menu ion-toolbar {
  --background: var(--ion-color-primary);
  --color: var(--ion-color-primary-contrast);
}

ion-menu ion-content {
  --background: var(--ion-background-color);
}

ion-menu ion-item {
  --background: transparent;
  --color: var(--ion-text-color);
  --border-color: var(--ion-border-color);
}

ion-menu ion-item.selected-item {
  --background: var(--ion-color-primary);
  --color: var(--ion-color-primary-contrast);
}

ion-menu ion-icon {
  color: var(--ion-color-primary);
}

ion-menu ion-item.selected-item ion-icon {
  color: var(--ion-color-primary-contrast);
}

ion-avatar {
  width: 40px;
  height: 40px;
}

.menu-open ion-content {
  margin-left: 250px;
}

@media (max-width: 576px) {
  .menu-open ion-content {
    margin-left: 0;
  }
}
</style>

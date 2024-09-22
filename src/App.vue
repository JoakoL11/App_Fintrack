<template>
  <ion-app>
    <ion-router-outlet />
    <MenuComponent />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import MenuComponent from './components/MenuComponent.vue';
import router from './router';

</script>

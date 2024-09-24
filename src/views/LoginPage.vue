<template>
  <ion-page>
    <ion-content class="ion-padding">
      <h1>Inicio de sesión</h1>

      <ion-item>
        <ion-input
          v-model="email"
          label="Email"
          type="email"
          label-placement="floating"
          placeholder="ejemplo@gmail.com"
        ></ion-input>
      </ion-item>

      <ion-item>
        <ion-input
          v-model="password"
          label="Contraseña"
          type="password"
          label-placement="floating"
          placeholder="Contraseña"
        >
          <ion-input-password-toggle slot="end"></ion-input-password-toggle>
        </ion-input>
      </ion-item>

      <ion-button shape="round" expand="block" @click="login">Entrar</ion-button>
      <ion-button shape="round" expand="block" fill="outline" @click="goToRegister">Registrarse</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonContent, IonButton, IonInput, IonItem } from '@ionic/vue';

const router = useRouter();
const email = ref('');
const password = ref('');

const login = () => {
  console.log("Email:", email.value);
  console.log("Password:", password.value);
  // Aquí iría la lógica de autenticación
};

const goToRegister = () => {
  router.push('/register'); // Cambiar a la página de registro
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
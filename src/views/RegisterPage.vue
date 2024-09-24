<template>
    <ion-page>
      <ion-content class="ion-padding">
        <h1>Registro</h1>
  
        <ion-item>
          <ion-input
            v-model="name"
            label="Nombre"
            type="text"
            label-placement="floating"
            placeholder="Ingresa tu nombre"
          ></ion-input>
        </ion-item>
  
        <ion-item>
          <ion-input
            v-model="email"
            label="Email"
            type="email"
            label-placement="floating"
            placeholder="Ingresa tu correo"
          ></ion-input>
        </ion-item>
  
        <ion-item>
          <ion-input
            label="Teléfono"
            type="tel"
            label-placement="floating"
            placeholder="987654321"
          ></ion-input>
        </ion-item>
  
        <ion-item>
          <ion-input
            v-model="password"
            label="Contraseña"
            type="password"
            label-placement="floating"
            placeholder="Ingresa tu contraseña"
          >
            <ion-input-password-toggle slot="end"></ion-input-password-toggle>
          </ion-input>
        </ion-item>
  
        <ion-button shape="round" expand="block" @click="register">Registrar</ion-button>
        <ion-button shape="round" expand="block" fill="outline" @click="goToLogin">Volver al Login</ion-button>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { IonContent, IonButton, IonInput, IonItem, IonInputPasswordToggle } from '@ionic/vue';
  
  const router = useRouter();
  const name = ref('');
  const email = ref('');
  const password = ref('');
  
  const register = () => {
    console.log("Nombre:", name.value);
    console.log("Email:", email.value);
    console.log("Password:", password.value);
    // Aquí iría la lógica de registro
  };
  
  const goToLogin = () => {
    router.push('/login'); // Cambiar a la página de login
  };
  </script>
  
  <style scoped>
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  </style>
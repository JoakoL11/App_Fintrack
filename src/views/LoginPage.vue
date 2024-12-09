<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Iniciar Sesión</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-item>
        <ion-label position="stacked">Correo Electrónico</ion-label>
        <ion-input
          v-model="email"
          type="email"
          placeholder="Ingrese su correo"
          @ionChange="updateEmail"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Contraseña</ion-label>
        <ion-input
          v-model="password"
          type="password"
          placeholder="Ingrese su contraseña"
          @ionChange="updatePassword"
        ></ion-input>
      </ion-item>
      <ion-button expand="full" @click="login">Iniciar Sesión</ion-button>
      <ion-button expand="full" color="light" @click="goToRegister">
        Registrarse
      </ion-button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </ion-content>
  </ion-page>
</template>

<script>
import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    updateEmail(event) {
      this.email = event.target.value;
      console.log("Correo actualizado:", this.email); // Depuración
    },
    updatePassword(event) {
      this.password = event.target.value;
      console.log("Contraseña actualizada:", this.password); // Depuración
    },
    goToRegister() {
      this.$router.push("/register"); // Redirige a la página de registro
    },
    validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email.trim());
    },
    async login() {
      console.log("Correo ingresado:", this.email); // Depuración
      console.log("Contraseña ingresada:", this.password); // Depuración

      // Validar email
      if (!this.validateEmail(this.email)) {
        this.errorMessage = "Por favor, ingrese un correo electrónico válido.";
        return;
      }

      if (!this.password) {
        this.errorMessage = "Por favor, ingrese su contraseña.";
        return;
      }

      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          this.email.trim(),
          this.password
        );

        console.log("Usuario autenticado:", userCredential.user);
        this.$router.push("/home");
      } catch (error) {
        this.errorMessage = `Error al iniciar sesión: ${error.message}`;
        console.error("Error al iniciar sesión:", error);
      }
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
  text-align: center;
}
</style>

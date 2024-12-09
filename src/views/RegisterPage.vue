<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Registrarse</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-item>
        <ion-label position="stacked">Nombre</ion-label>
        <ion-input v-model="name" placeholder="Ingrese su nombre"></ion-input>
      </ion-item>
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
      <ion-item>
        <ion-label position="stacked">Confirmar Contraseña</ion-label>
        <ion-input
          v-model="confirmPassword"
          type="password"
          placeholder="Confirme su contraseña"
          @ionChange="updateConfirmPassword"
        ></ion-input>
      </ion-item>
      <ion-button expand="full" @click="register">Registrarse</ion-button>
      <ion-button expand="full" color="light" @click="goToLogin">
        Volver a Iniciar Sesión
      </ion-button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </ion-content>
  </ion-page>
</template>

<script>
import { auth, dataBase } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      errorMessage: "",
    };
  },
  methods: {
    updateEmail(event) {
      this.email = event.target.value;
      console.log("Correo actualizado:", this.email);
    },
    updatePassword(event) {
      this.password = event.target.value;
      console.log("Contraseña actualizada:", this.password);
    },
    updateConfirmPassword(event) {
      this.confirmPassword = event.target.value;
      console.log("Confirmación de contraseña actualizada:", this.confirmPassword);
    },
    goToLogin() {
      this.$router.push("/login"); // Redirige a la página de inicio de sesión
    },
    validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email.trim());
    },
    async register() {
      console.log("Correo ingresado:", this.email);
      console.log("Contraseña ingresada:", this.password);

      if (!this.validateEmail(this.email)) {
        this.errorMessage = "Por favor, ingrese un correo electrónico válido.";
        return;
      }

      if (!this.password || !this.confirmPassword) {
        this.errorMessage = "Por favor, complete ambos campos de contraseña.";
        return;
      }

      if (this.password !== this.confirmPassword) {
        this.errorMessage = "Las contraseñas no coinciden.";
        return;
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.email.trim(),
          this.password
        );

        const userId = userCredential.user.uid;

        await setDoc(doc(dataBase, "users", userId), {
          name: this.name,
          email: this.email.trim(),
          createdAt: new Date(),
        });

        console.log("Usuario registrado y datos guardados con éxito.");
        this.$router.push("/login");
      } catch (error) {
        this.errorMessage = `Error al registrarse: ${error.message}`;
        console.error("Error:", error);
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

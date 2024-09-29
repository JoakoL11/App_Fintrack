<template>
  <ion-page>
    <ion-content class="ion-padding" style="--background: url('https://s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2018/01/24115423/Economia-Day-5.jpg') no-repeat center center / cover;">
      <div class="form-container">
        <div class="title-box">
          <h1>Iniciar Sesión</h1>
        </div>
        <div class="form-box">
          <ion-item class="custom-item" :class="{ 'error-item': emailError, 'success-item': emailValid }">
            <ion-input
              v-model="email"
              label="Email"
              type="email"
              label-placement="floating"
              placeholder="Ingresa tu correo"
            ></ion-input>
          </ion-item>
          <p v-if="emailError" class="error-message">{{ emailError }}</p>

          <ion-item class="custom-item" :class="{ 'error-item': passwordError, 'success-item': passwordValid }">
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
          <p v-if="passwordError" class="error-message">{{ passwordError }}</p>

          <ion-button type="submit" shape="round" expand="block" @click="login" class="login-button">
            Entrar
          </ion-button>
          <ion-button shape="round" expand="block" fill="outline" @click="goToRegister" class="register-button">
            Registrarse
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonContent, IonButton, IonInput, IonItem, IonInputPasswordToggle, IonPage, alertController } from '@ionic/vue';

export default {
  components: {
    IonContent,
    IonButton,
    IonInput,
    IonItem,
    IonInputPasswordToggle,
    IonPage
  },
  setup() {
    const router = useRouter();
    const email = ref('');
    const password = ref('');

    // Errores y validaciones
    const emailError = ref('');
    const passwordError = ref('');
    const emailValid = ref(false);
    const passwordValid = ref(false);

    // Función para mostrar una alerta
    const showAlert = async (message) => {
      const alert = await alertController.create({
        header: 'Alerta',
        message,
        buttons: ['Aceptar'],
      });
      await alert.present();
    };

    // Lógica de inicio de sesión
    const login = async () => {
      // Reiniciar errores y validaciones
      emailError.value = '';
      passwordError.value = '';
      emailValid.value = false;
      passwordValid.value = false;

      // Validaciones
      if (!email.value) {
        emailError.value = 'Por favor, ingresa tu correo electrónico.';
      } else {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value)) {
          emailError.value = 'Por favor, ingresa un correo electrónico válido.';
        } else {
          emailValid.value = true;
        }
      }

      if (!password.value) {
        passwordError.value = 'Por favor, ingresa tu contraseña.';
      } else {
        passwordValid.value = true;
      }

      if (emailError.value || passwordError.value) {
        return; // Si hay errores, no continuar
      }

      // Recuperar los usuarios de localStorage
      const users = JSON.parse(localStorage.getItem('users')) || [];

      // Buscar el usuario por email y contraseña
      const user = users.find(user => user.email === email.value && user.password === password.value);

      if (user) {
        await showAlert('Inicio de sesión exitoso!');
        // Aquí puedes redirigir al usuario a la página principal o de dashboard
        router.push('/home');
      } else {
        await showAlert('Correo o contraseña incorrectos.');
      }
    };

    const goToRegister = () => {
      router.push('/register');
    };

    return { email, password, login, goToRegister, emailError, passwordError, emailValid, passwordValid };
  }
};
</script>

<style scoped>
.form-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background-image: #ffffff; /* fondo para el formulario */
}

.title-box {
  border: 2px solid #ffffff; /* Color del borde */
  border-radius: 15px; /* Bordes redondeados */
  padding: 10px; /* Espaciado interno */
  margin-bottom: 20px; /* Espacio debajo del título */
  text-align: center; /* Centrar el texto */
  background-color: rgba(141, 141, 141, 0.897); /* Fondo semi-transparente */
}

h1 {
  color: #000000; /* Color del texto del título */
  font-size: 24px;
  font-weight: bold;
}

.form-box {
  border: 2px solid black; /* Borde del recuadro */
  border-radius: 20px; /* Bordes redondeados */
  padding: 20px; /* Espaciado interno */
  background-color: #262323fb; /* Fondo del recuadro */
}

.custom-item {
  margin-bottom: 15px; /* espacio entre campos */
  --min-height: 50px; /* reduce el tamaño del input */
  --border-radius: 20px; /* bordes redondeados */
  --background: rgba(223, 222, 222, 0.984); /* Fondo blanco para los inputs */
  --padding-start: 12px;
  --padding-end: 12px;
}

/* Botones personalizados */
.login-button {
  margin-top: 20px;
  --color: white;
  font-size: 16px;
}

.register-button {
  --background: #ffffff;
  --color: #3880ff;
  --border-color: #3880ff;
  margin-top: 10px;
  font-size: 16px;
}

.error-message {
  color: red; /* Color del texto del mensaje de error */
  font-size: 12px; /* Tamaño del texto */
  margin-top: 5px; /* Espaciado superior */
}

/* Responsividad */
@media (min-width: 800px) {
  .form-box {
    max-width: 400px;
    padding: 30px;
  }
}

@media (max-width: 600px) {
  .form-box {
    padding: 15px;
    max-width: 100%;
  }
}
</style>
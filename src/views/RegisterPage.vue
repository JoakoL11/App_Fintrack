<template>
  <ion-page>
    <ion-content class="ion-padding" style="--background: url('https://s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2018/01/24115423/Economia-Day-5.jpg') no-repeat center center / cover;">
      <div class="form-container">
        <div class="title-box">
          <h1>Crear una Cuenta</h1>
        </div>
        <div class="form-box">
          <!-- Campo Nombre -->
          <ion-item class="custom-item" :class="{ 'error-item': nameError, 'success-item': nameValid }">
            <ion-input
              v-model="name"
              label="Nombre"
              type="text"
              label-placement="floating"
              placeholder="Ingresa tu nombre"
              @ionBlur="validateName"  
            ></ion-input>
          </ion-item>
          <p v-if="nameError" class="error-message">{{ nameError }}</p>
          <p v-if="nameValid" class="success-message">Nombre válido</p>

          <!-- Campo Email -->
          <ion-item class="custom-item" :class="{ 'error-item': emailError, 'success-item': emailValid }">
            <ion-input
              v-model="email"
              label="Email"
              type="email"
              label-placement="floating"
              placeholder="Ingresa tu correo"
              @ionBlur="validateEmail" 
            ></ion-input>
          </ion-item>
          <p v-if="emailError" class="error-message">{{ emailError }}</p>
          <p v-if="emailValid" class="success-message">Email válido</p>

          <!-- Campo Teléfono -->
          <ion-item class="custom-item" :class="{ 'error-item': phoneError, 'success-item': phoneValid }">
            <ion-input
              v-model="phone"
              label="Teléfono"
              type="tel"
              label-placement="floating"
              placeholder="987654321"
              @ionBlur="validatePhone" 
            ></ion-input>
          </ion-item>
          <p v-if="phoneError" class="error-message">{{ phoneError }}</p>
          <p v-if="phoneValid" class="success-message">Teléfono válido</p>

          <!-- Campo Contraseña -->
          <ion-item class="custom-item" :class="{ 'error-item': passwordError, 'success-item': passwordValid }">
            <ion-input
              v-model="password"
              label="Contraseña"
              type="password"
              label-placement="floating"
              placeholder="Ingresa tu contraseña"
              @ionBlur="validatePassword" 
            >
              <ion-input-password-toggle slot="end"></ion-input-password-toggle>
            </ion-input>
          </ion-item>
          <p v-if="passwordError" class="error-message">{{ passwordError }}</p>
          <p v-if="passwordValid" class="success-message">Contraseña válida</p>

          <!-- Botón Registrar -->
          <ion-button type="submit" shape="round" expand="block" @click="register" class="register-button">
            Registrar
          </ion-button>

          <!-- Botón Volver al Login -->
          <ion-button shape="round" expand="block" fill="outline" @click="goToLogin" class="login-button">
            Volver al Login
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script >
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonContent, IonButton, IonInput, IonItem, IonInputPasswordToggle, IonPage, alertController } from '@ionic/vue';

// Recuperar los usuarios de localStorage o iniciar un arreglo vacío si no hay datos
const users = JSON.parse(localStorage.getItem('users')) || [];

export const registerUser = (name, email, phone, password) => {
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return { error: "El usuario ya existe." };
  }

  const newUser = { name, email, phone, password };
  users.push(newUser);

  // Guardar los usuarios actualizados en localStorage
  localStorage.setItem('users', JSON.stringify(users));

  return { success: true };
};

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
    const name = ref('');
    const email = ref('');
    const phone = ref('');
    const password = ref('');

    // Errores y validaciones
    const nameError = ref('');
    const emailError = ref('');
    const phoneError = ref('');
    const passwordError = ref('');

    const nameValid = ref(false);
    const emailValid = ref(false);
    const phoneValid = ref(false);
    const passwordValid = ref(false);

    const showAlert = async (message) => {
      const alert = await alertController.create({
        header: 'Alerta',
        message,
        buttons: ['Aceptar'],
      });
      await alert.present();
    };

    // Validación de campos individuales cuando el usuario pierde el foco
    const validateName = () => {
      if (!name.value) {
        nameError.value = "Por favor, ingresa tu nombre.";
        nameValid.value = false;
      } else {
        nameError.value = '';
        nameValid.value = true;
      }
    };

    const validateEmail = () => {
      if (!email.value) {
        emailError.value = "Por favor, ingresa tu correo electrónico.";
        emailValid.value = false;
      } else {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value)) {
          emailError.value = "Por favor, ingresa un correo electrónico válido.";
          emailValid.value = false;
        } else {
          emailError.value = '';
          emailValid.value = true;
        }
      }
    };

    const validatePhone = () => {
      if (!phone.value) {
        phoneError.value = "Por favor, ingresa tu número de teléfono.";
        phoneValid.value = false;
      } else {
        const phonePattern = /^[0-9]{9,15}$/;
        if (!phonePattern.test(phone.value)) {
          phoneError.value = "Por favor, ingresa un número de teléfono válido (9 a 15 dígitos).";
          phoneValid.value = false;
        } else {
          phoneError.value = '';
          phoneValid.value = true;
        }
      }
    };

    const validatePassword = () => {
      if (!password.value) {
        passwordError.value = "Por favor, ingresa tu contraseña.";
        passwordValid.value = false;
      } else {
        passwordError.value = '';
        passwordValid.value = true;
      }
    };

    // Registro de usuario cuando se completan todas las validaciones
    const register = async () => {
      validateName();
      validateEmail();
      validatePhone();
      validatePassword();

      // Verificar si hay errores
      if (!nameValid.value || !emailValid.value || !phoneValid.value || !passwordValid.value) {
        return; // Si hay errores, no continuar
      }

      const result = registerUser(name.value, email.value, phone.value, password.value);
      if (result.error) {
        await showAlert(result.error);
      } else {
        await showAlert("Registro exitoso!");
        goToLogin();
      }
    };

    const goToLogin = () => {
      router.push('/login'); // Cambia a la página de login
    };

    return { 
      name, email, phone, password, 
      register, goToLogin, 
      nameError, emailError, phoneError, passwordError, 
      nameValid, emailValid, phoneValid, passwordValid,
      validateName, validateEmail, validatePhone, validatePassword 
    };
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
  background-color: rgba(255, 255, 255, 0.897); /* Fondo semi-transparente */
}

h1 {
  color: #333333; /* Color del texto del título */
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
  --background: rgba(255, 255, 255, 0.984); /* Fondo blanco para los inputs */
  --padding-start: 12px;
  --padding-end: 12px;
}

.error-item {
  border: 5px solid red; /* Bordes rojos para campos inválidos */
  border-radius: 25px; /* Bordes redondeados */
}

.success-item {
  border: 5px solid green; /* Bordes verdes para campos válidos */
  border-radius: 25px; /* Bordes redondeados */
}

.error-message {
  color: red; /* Color del texto del mensaje de error */
  font-size: 12px; /* Tamaño del texto */
  margin-top: 5px; /* Espaciado superior */
}

.success-message {
  color: green; /* Color del texto del mensaje de éxito */
  font-size: 12px; /* Tamaño del texto */
  margin-top: 5px; /* Espaciado superior */
}

.register-button {
  color: white; /* color del texto del botón */
  margin-bottom: 10px;
}

.login-button {
  color: #3880ff; /* color del texto del botón de volver al login */
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

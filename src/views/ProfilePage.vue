<template>
  <ion-page class="profile-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>Mi Perfil</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content class="ion-padding">
      <div class="profile-container">
        <div class="profile-header">
          <ion-avatar>
            <img :src="userAvatar" alt="Avatar del usuario" />
          </ion-avatar>
          <h2>{{ userName }}</h2>
          <p>{{ userEmail }}</p>
        </div>
        
        <ion-list lines="none" class="profile-options">
          <ion-item button @click="editProfile">
            <ion-icon :icon="personOutline" slot="start"></ion-icon>
            <ion-label>
              <h3>Editar perfil</h3>
              <p>Actualiza tu información personal</p>
            </ion-label>
          </ion-item>
          
          <ion-item button @click="changePassword">
            <ion-icon :icon="lockClosedOutline" slot="start"></ion-icon>
            <ion-label>
              <h3>Cambiar contraseña</h3>
              <p>Actualiza tu contraseña</p>
            </ion-label>
          </ion-item>
          
          <ion-item button @click="configureNotifications">
            <ion-icon :icon="notificationsOutline" slot="start"></ion-icon>
            <ion-label>
              <h3>Notificaciones</h3>
              <p>Configura tus preferencias de notificación</p>
            </ion-label>
          </ion-item>
          
          <ion-item button @click="managePrivacy">
            <ion-icon :icon="shieldOutline" slot="start"></ion-icon>
            <ion-label>
              <h3>Privacidad y seguridad</h3>
              <p>Gestiona la seguridad de tu cuenta</p>
            </ion-label>
          </ion-item>
        </ion-list>
        
        <ion-button expand="block" color="danger" class="logout-button" @click="handleLogout">
          Cerrar sesión
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonAvatar, IonList, IonItem, IonLabel, IonIcon, IonButton } from '@ionic/vue';
import { personOutline, lockClosedOutline, notificationsOutline, shieldOutline } from 'ionicons/icons';

const router = useRouter();

const userName = ref('Juan Pérez');
const userEmail = ref('juan.perez@example.com');
const userAvatar = ref('https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y');

const editProfile = () => {
  console.log('Editar perfil');
};

const changePassword = () => {
  console.log('Cambiar contraseña');
};

const configureNotifications = () => {
  console.log('Configurar notificaciones');
};

const managePrivacy = () => {
  console.log('Gestionar privacidad y seguridad');
};

const handleLogout = () => {
  console.log('Cerrando sesión');
  // Aquí puedes agregar lógica para limpiar el estado de la sesión, tokens, etc.
  // Por ejemplo:
  // localStorage.removeItem('authToken');
  
  // Redirigir al usuario a la página de inicio de sesión
  router.push('/login');
};
</script>


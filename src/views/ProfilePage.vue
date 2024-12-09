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
          <ion-item button @click="openEditModal">
            <ion-icon :icon="personOutline" slot="start"></ion-icon>
            <ion-label>
              <h3>Editar perfil</h3>
              <p>Actualiza tu información personal</p>
            </ion-label>
          </ion-item>
          <ion-item button @click="openChangePasswordModal">
            <ion-icon :icon="lockClosedOutline" slot="start"></ion-icon>
            <ion-label>
              <h3>Cambiar contraseña</h3>
              <p>Actualiza tu contraseña</p>
            </ion-label>
          </ion-item>
        </ion-list>
        
        <ion-button expand="block" color="danger" class="logout-button" @click="handleLogout">
          Cerrar sesión
        </ion-button>
      </div>
    </ion-content>

    <!-- Modal para editar perfil -->
    <ion-modal :is-open="isEditModalOpen" @ion-modal-did-dismiss="closeEditModal">
      <ion-header>
        <ion-toolbar>
          <ion-title>Editar Perfil</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="closeEditModal">Cerrar</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <form @submit.prevent="saveProfileChanges">
          <ion-item>
            <ion-label position="stacked">Nombre</ion-label>
            <ion-input v-model="newName" placeholder="Tu nombre"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Foto de Perfil</ion-label>
            <ion-input v-model="newAvatar" placeholder="URL de la foto"></ion-input>
          </ion-item>
          <ion-button expand="block" type="submit">Guardar Cambios</ion-button>
        </form>
      </ion-content>
    </ion-modal>

    <!-- Modal para cambiar contraseña -->
    <ion-modal :is-open="isChangePasswordModalOpen" @ion-modal-did-dismiss="closeChangePasswordModal">
      <ion-header>
        <ion-toolbar>
          <ion-title>Cambiar Contraseña</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="closeChangePasswordModal">Cerrar</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <form @submit.prevent="changePassword">
          <ion-item>
            <ion-label position="stacked">Nueva Contraseña</ion-label>
            <ion-input v-model="newPassword" type="password" placeholder="Nueva contraseña"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Confirmar Contraseña</ion-label>
            <ion-input v-model="confirmPassword" type="password" placeholder="Confirma tu contraseña"></ion-input>
          </ion-item>
          <ion-button expand="block" type="submit">Actualizar Contraseña</ion-button>
        </form>
        <p v-if="passwordError" class="error">{{ passwordError }}</p>
      </ion-content>
    </ion-modal>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { auth, dataBase } from '@/firebase';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { updateProfile, updatePassword } from 'firebase/auth';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonAvatar, IonList, IonItem, IonLabel, IonIcon, IonButton, IonModal } from '@ionic/vue';
import { personOutline, lockClosedOutline } from 'ionicons/icons';

const router = useRouter();

const userName = ref('');
const userEmail = ref('');
const userAvatar = ref('https://gravatar.com/avatar/default-avatar.png');
const isEditModalOpen = ref(false);
const isChangePasswordModalOpen = ref(false);
const newName = ref('');
const newAvatar = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const passwordError = ref('');

const fetchUserData = async () => {
  const user = auth.currentUser;
  if (user) {
    userEmail.value = user.email || '';
    userAvatar.value = user.photoURL || 'https://gravatar.com/avatar/default-avatar.png';
    newName.value = user.displayName || '';
    newAvatar.value = user.photoURL || '';

    const userDoc = await getDoc(doc(dataBase, "users", user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      userName.value = userData.displayName || 'Usuario Anónimo';
      newName.value = userData.displayName || '';
      newAvatar.value = userData.photoURL || 'https://gravatar.com/avatar/default-avatar.png';
    } else {
      userName.value = 'Usuario Anónimo';
    }
  } else {
    router.push('/login');
  }
};

const openEditModal = () => {
  isEditModalOpen.value = true;
};

const closeEditModal = () => {
  isEditModalOpen.value = false;
};

const saveProfileChanges = async () => {
  const user = auth.currentUser;
  if (user) {
    await updateProfile(user, {
      displayName: newName.value,
      photoURL: newAvatar.value,
    });

    const userDocRef = doc(dataBase, "users", user.uid);
    await updateDoc(userDocRef, {
      displayName: newName.value,
      photoURL: newAvatar.value,
    });

    userName.value = newName.value;
    userAvatar.value = newAvatar.value;

    console.log('Perfil actualizado');
    closeEditModal();
  } else {
    console.error('No hay usuario autenticado');
  }
};

const openChangePasswordModal = () => {
  isChangePasswordModalOpen.value = true;
};

const closeChangePasswordModal = () => {
  isChangePasswordModalOpen.value = false;
};

const changePassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    passwordError.value = 'Las contraseñas no coinciden';
    return;
  }

  const user = auth.currentUser;
  if (user) {
    try {
      await updatePassword(user, newPassword.value);
      console.log('Contraseña actualizada');
      closeChangePasswordModal();
    } catch (error) {
      passwordError.value = `Error al cambiar contraseña: ${error.message}`;
      console.error(error);
    }
  } else {
    passwordError.value = 'No hay usuario autenticado';
  }
};

const handleLogout = async () => {
  await auth.signOut();
  router.push('/login');
};

onMounted(fetchUserData);
</script>

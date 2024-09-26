<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button default-href="/home"></ion-back-button>
      </ion-buttons>
      <ion-title>Perfil de Usuario</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <div class="profile-container">
      <div class="title-box">
        <h1>Detalles del Usuario</h1>
      </div>
      <div class="info-box">
        <div class="info-item">
          <strong>Nombre de Usuario:</strong>
          <span>{{ username }}</span>
        </div>
        <div class="info-item">
          <strong>Email:</strong>
          <span>{{ email }}</span>
        </div>
        <div class="info-item">
          <strong>Teléfono:</strong>
          <span>{{ telefono }}</span>
        </div>
      </div>
      <ion-button expand="block" @click="toggleEdit" class="edit-button">
        {{ isEditing ? 'Guardar Cambios' : 'Editar Perfil' }}
      </ion-button>
    </div>
  </ion-content>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const username = ref('Usuario Ejemplo');
const email = ref('usuario@ejemplo.com');
const telefono = ref('123-456-7890');  // Cambié el tipo a string para teléfonos

const isEditing = ref(false);

function toggleEdit() {
  if (isEditing.value) {
    // Lógica para guardar cambios (actualizar datos en la base de datos o estado)
    alert('Cambios guardados: ' + 
          `Usuario: ${username.value}, Email: ${email.value}, Teléfono: ${telefono.value}`);
  }
  isEditing.value = !isEditing.value; // Cambiar estado de edición
}
</script>

<style scoped>
.profile-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background-color: #ffffff; /* Fondo para el perfil */
  border-radius: 10px; /* Bordes redondeados */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Sombra para efecto de profundidad */
}

.title-box {
  text-align: center; /* Centrar el texto */
  margin-bottom: 20px; /* Espacio debajo del título */
}

h1 {
  color: #333333; /* Color del texto del título */
  font-size: 24px;
  font-weight: bold;
}

.info-box {
  border: 1px solid #ccc; /* Borde del recuadro */
  border-radius: 10px; /* Bordes redondeados */
  padding: 20px; /* Espaciado interno */
  background-color: #b1afaf; /* Fondo del recuadro */
  margin-bottom: 20px; /* Espacio debajo del recuadro */
}

.info-item {
  margin-bottom: 10px; /* Espacio entre los elementos de información */
}

.edit-button {
  margin-top: 10px;
  --color: white;
  font-size: 16px;
}
</style>
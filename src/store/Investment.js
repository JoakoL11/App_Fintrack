import { defineStore } from "pinia";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { dataBase } from "@/firebase.js"; 

export const useInvestmentStore = defineStore("investments", {
  state: () => ({
    investments: [] // Array para almacenar las inversiones
  }),

  actions: {
    // Obtener todas las inversiones desde Firestore
    async fetchInvestments() {
      try {
        const querySnapshot = await getDocs(collection(dataBase, "investments"));
        this.investments = querySnapshot.docs.map(doc => ({
          id: doc.id, // ID único del documento
          ...doc.data() // Los datos del documento
        }));
        console.log("Inversiones obtenidas");
      } catch (error) {
        console.error("Error al obtener las inversiones:", error);
      }
    },

    // Agregar una nueva inversión a Firestore
    async addInvestment(investment) {
      try {
        const docRef = await addDoc(collection(dataBase, "investments"), investment);
        console.log("Inversión añadida");

        // Actualizar el estado local
        this.investments.push({
          id: docRef.id,
          ...investment
        });
      } catch (error) {
        console.error("Error al agregar la inversión:", error);
      }
    },

    // Eliminar una inversión de Firestore
    async deleteInvestment(id) {
      try {
        const docRef = doc(dataBase, "investments", id);
        await deleteDoc(docRef);

        // Eliminar localmente de la lista de inversiones
        this.investments = this.investments.filter(item => item.id !== id);
        console.log("Inversión eliminada con éxito");
      } catch (error) {
        console.error("Error al eliminar la inversión:", error);
      }
    },

    // Modificar una inversión existente
    async updateInvestment(id, updatedInvestment) {
      try {
        const docRef = doc(dataBase, "investments", id);
        await updateDoc(docRef, updatedInvestment);

        // Actualizar la inversión localmente
        const index = this.investments.findIndex(item => item.id === id);
        if (index !== -1) {
          this.investments[index] = { id, ...updatedInvestment };
        }
        console.log("Inversión modificada con éxito");
      } catch (error) {
        console.error("Error al modificar la inversión:", error);
      }
    }
  }
});
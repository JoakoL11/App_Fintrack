import { defineStore } from "pinia";
import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { dataBase } from "@/firebase.js";

export const useBudgetStore = defineStore("budgets", {
  state: () => ({
    budgets: [] // Lista de presupuestos
  }),

  actions: {
    // Escuchar cambios en tiempo real en la colección "budgets"
    fetchBudgets() {
      const budgetsCollection = collection(dataBase, "budgets");

      // Listener de tiempo real
      onSnapshot(budgetsCollection, (snapshot) => {
        this.budgets = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log("Presupuestos actualizados en tiempo real:", this.budgets);
      });
    },

    // Agregar un nuevo presupuesto
    async addBudget(budget) {
      try {
        const docRef = await addDoc(collection(dataBase, "budgets"), budget);
        console.log("Presupuesto añadido con éxito:", docRef.id);
      } catch (error) {
        console.error("Error al agregar el presupuesto:", error);
      }
    },

    // Eliminar un presupuesto
    async deleteBudget(id) {
      try {
        await deleteDoc(doc(dataBase, "budgets", id));
        console.log("Presupuesto eliminado con éxito:", id);
      } catch (error) {
        console.error("Error al eliminar el presupuesto:", error);
      }
    },

    // Editar un presupuesto
    async updateBudget(id, updatedBudget) {
      try {
        await updateDoc(doc(dataBase, "budgets", id), updatedBudget);
        console.log("Presupuesto actualizado con éxito:", id);
      } catch (error) {
        console.error("Error al actualizar el presupuesto:", error);
      }
    }
  }
});

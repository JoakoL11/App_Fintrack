import { defineStore } from "pinia";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { dataBase } from "@/firebase.js";

export const useTransactionStore = defineStore("transactions", {
  state: () => ({
    transactions: [] // Array para almacenar las transacciones
  }),

  actions: {
    // Obtener todas las transacciones desde Firestore
    async fetchTransactions() {
      try {
        const querySnapshot = await getDocs(collection(dataBase, "transactions"));
        this.transactions = querySnapshot.docs.map(doc => ({
          id: doc.id, // ID único del documento
          ...doc.data() // Los datos del documento
        }));
        console.log("Transacciones obtenidas");
      } catch (error) {
        console.error("Error al obtener las transacciones:", error);
      }
    },

    // Agregar una nueva transacción a Firestore
    async addTransaction(transaction) {
      try {
        const docRef = await addDoc(collection(dataBase, "transactions"), transaction);
        console.log("Transacción añadida");
        this.transactions.push({
          id: docRef.id,
          ...transaction
        });
      } catch (error) {
        console.error("Error al agregar la transacción:", error);
      }
    },

    // Eliminar una transacción de Firestore
    async deleteTransaction(id) {
      try {
        const docRef = doc(dataBase, "transactions", id);
        await deleteDoc(docRef);

        // Eliminar localmente de la lista de transacciones
        this.transactions = this.transactions.filter(item => item.id !== id);
        console.log("Transacción eliminada con éxito");
      } catch (error) {
        console.error("Error al eliminar la transacción:", error);
      }
    },

    // Modificar una transacción existente
    async updateTransaction(id, updatedTransaction) {
      try {
        const docRef = doc(dataBase, "transactions", id);
        await updateDoc(docRef, updatedTransaction);

        // Actualizar la transacción localmente
        const index = this.transactions.findIndex(item => item.id === id);
        if (index !== -1) {
          this.transactions[index] = { id, ...updatedTransaction };
        }
        console.log("Transacción modificada con éxito");
      } catch (error) {
        console.error("Error al modificar la transacción:", error);
      }
    }
  }
});

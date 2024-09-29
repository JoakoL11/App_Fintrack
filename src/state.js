import { reactive } from 'vue';

export const state = reactive({
  transactions: [
    { concept: 'Impuesto', amount: 1500, type: 'Pago', date: new Date('2024-09-01') }
    // aqui van las transacciones
  ],
  investments: [
    { name: 'Acción ABC', amount: 5000, type: 'Acciones', date: new Date('2024-09-01') }
    // aqui van las inversiones
  ],
  budgets: [
    {
      description: 'Gastos mensuales', amount: 2000, date: new Date('2024-09-01')}
    
  ],
  // supuestamente aqui se guarda el presupuesto
  // si tan solo funcionara bien

});

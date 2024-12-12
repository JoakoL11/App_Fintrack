<template>
    <canvas ref="chartCanvas"></canvas>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import { Chart, registerables } from 'chart.js';
  import 'chartjs-adapter-date-fns'; // Importar el adaptador de fechas
  Chart.register(...registerables);
  
  interface Transaction {
    id: number;
    description: string;
    amount: number;
    date: string;
    type: 'Ingreso' | 'Gasto' | 'Impuesto';
  }
  
  const props = defineProps<{
    transactions: Transaction[];
  }>();
  
  const chartCanvas = ref<HTMLCanvasElement | null>(null);
  let chartInstance: Chart | null = null;
  
  const createChart = () => {
    if (chartCanvas.value && props.transactions) {
      console.log('Transactions:', props.transactions); // Verificar los datos
      const ctx = chartCanvas.value.getContext('2d');
      if (ctx) {
        if (chartInstance) {
          chartInstance.destroy();
        }
  
        const labels = props.transactions.map(t => new Date(t.date));
        const data = props.transactions.map(t => t.amount);
  
        console.log('Labels:', labels); // Verificar las etiquetas
        console.log('Data:', data); // Verificar los datos
  
        chartInstance = new Chart(ctx, {
          type: 'line',
          data: {
            labels,
            datasets: [{
              label: 'Balance de Transacciones',
              data,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true,
            }]
          },
          options: {
            responsive: true,
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'day'
                }
              },
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    }
  };
  
  onMounted(createChart);
  watch(() => props.transactions, createChart);
  </script>
  
  <style scoped>
  canvas {
    max-width: 100%;
  }
  </style>
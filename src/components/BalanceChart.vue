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
    const ctx = chartCanvas.value.getContext('2d');
    if (ctx) {
      if (chartInstance) {
        chartInstance.destroy();
      }

      const labels = props.transactions.map(t => new Date(t.date));
      let balance = 0;
      const data = props.transactions.map(t => {
        balance += t.type === 'Ingreso' ? t.amount : -t.amount;
        return balance;
      });

      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgba(75, 192, 192, 0.2)');
      gradient.addColorStop(1, 'rgba(75, 192, 192, 0)');

      chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: 'Balance de Transacciones',
            data,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: gradient,
            fill: true,
            tension: 0.4, // Suavizar la línea
            pointRadius: 0, // Ocultar los puntos
            pointHoverRadius: 7, // Tamaño de los puntos al pasar el mouse
          }]
        },
        options: {
          responsive: true,
          animation: {
            duration: 1000, // Duración de la animación en milisegundos
            easing: 'easeInOutQuad', // Tipo de animación
          },
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day'
              },
              grid: {
                display: false // Ocultar las líneas de la cuadrícula
              }
            },
            y: {
              beginAtZero: true,
              grid: {
                display: false // Ocultar las líneas de la cuadrícula
              }
            }
          },
          interaction: {
            mode: 'index',
            intersect: false,
          },
          plugins: {
            tooltip: {
              mode: 'index',
              intersect: false,
            },
            legend: {
              display: false, // Ocultar la leyenda
            },
          },
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
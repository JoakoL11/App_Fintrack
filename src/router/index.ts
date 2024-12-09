import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import LoginPage from '@/views/LoginPage.vue';
import BudgetPage from '@/views/BudgetPage.vue';
import ReportsPage from '@/views/ReportsPage.vue';
import TransactionsPage from '@/views/TransactionsPage.vue';
import InvestmentPage from '@/views/InvestmentPage.vue';
import RegisterPage from '@/views/RegisterPage.vue';
import ProfilePage from '@/views/ProfilePage.vue';
import AboutPage from '@/views/AboutPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login', // Redirigir a la página de inicio de sesión
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
  },

  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutPage.vue'),
  },
  {
    path: '/budget',
    name: 'Budget',
    component: BudgetPage,
  },
  {
    path: '/transactions',
    name: 'Transactions',
    component: TransactionsPage,
  },
  {
    path: '/investment',
    name: 'Investment',
    component: InvestmentPage,
  },
  {
    path: '/reports',
    name: 'Reports',
    component: ReportsPage,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;

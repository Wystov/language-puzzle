import { store } from '~/store';
export default defineNuxtRouteMiddleware(() => {
  if (!store.user) return navigateTo('/');
});

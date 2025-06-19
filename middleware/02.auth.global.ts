export default defineNuxtRouteMiddleware((to) => {
  if (!to.meta.useAuth) return;

  const store = useUserStore();
  const localePath = useLocalePath();
  if (to.meta.isLoggedIn && !store.isLoggedIn) return navigateTo(localePath("/auth/login"));
  if (!to.meta.isLoggedIn && store.isLoggedIn) return navigateTo(localePath("/app"));
});

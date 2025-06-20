import { toast } from "vue-sonner";
import type { TNull } from "~/types/utils/globals";
import type { IUser, IUserCreate, IUserLogin } from "~/types/user";

interface UserState {
  user: TNull<IUser>;
  loading: boolean;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    user: null,
    loading: false,
  }),
  getters: {
    translate: () => useNuxtApp().$i18n.t,
    isLoggedIn: (state): boolean => !!state.user,
  },
  actions: {
    async getMe() {
      try {
        const { data } = await useFetch<IUser>("/api/users/me");
        if (!data.value) return;
        this.user = data.value;
      }
      catch (e) {
        console.error(e);
      }
    },
    async login(body: IUserLogin): Promise<boolean> {
      this.loading = true;

      try {
        const user = await $fetch<IUser>("/api/auth/login", {
          method: "POST",
          body,
        });

        this.user = user;
        toast.success(this.translate("toasts.auth.login.success", { username: user.username }));
        return true;
      }
      catch {
        toast.error(this.translate("toasts.auth.login.error"));
        return false;
      }
      finally {
        this.loading = false;
      }
    },
    async register(body: IUserCreate): Promise<boolean> {
      this.loading = true;

      try {
        const user = await $fetch<IUser>("/api/auth/register", {
          method: "POST",
          body,
        });

        this.user = user;
        toast.success(this.translate("toasts.auth.register.success", { username: user.username }));
        return true;
      }
      catch {
        toast.error(this.translate("toasts.auth.register.error"));
        return false;
      }
      finally {
        this.loading = false;
      }
    },
    async logout() {
      try {
        await $fetch<IUser>("/api/auth/logout", {
          method: "DELETE",
        });
        this.user = null;
        toast.success(this.translate("toasts.auth.logout.success"));
      }
      catch {
        toast.error(this.translate("toasts.auth.logout.error"));
      }
    },
  },
});

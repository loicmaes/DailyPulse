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
      catch {
        toast.error(this.translate("toasts.errors.internal-server-error"));
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
        toast.success(this.translate("auth.login.toasts.success", { username: user.username }));
        return true;
      }
      catch {
        toast.error(this.translate("auth.login.toasts.error"));
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
        toast.success(this.translate("auth.register.toasts.success", { username: user.username }));
        return true;
      }
      catch {
        toast.error(this.translate("auth.register.toasts.error"));
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
        toast.success(this.translate("auth.logout.toasts.success"));
      }
      catch {
        toast.error(this.translate("auth.logout.toasts.error"));
      }
    },
  },
});

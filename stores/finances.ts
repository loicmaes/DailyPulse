import { toast } from "vue-sonner";
import type { ITransaction, ITransactionCreate } from "~/types/finances/transactions";
import type { ListResult } from "~/types/utils/globals";

interface FinancesState {
  totalTransactions: number;
  transactions: ITransaction[];
  loading: boolean;
}

export const useFinancesStore = defineStore("finances", {
  state: (): FinancesState => ({
    totalTransactions: -1,
    transactions: [],
    loading: false,
  }),
  getters: {
    translate: () => useNuxtApp().$i18n.t,
  },
  actions: {
    async loadTransactions() {
      this.loading = true;

      try {
        const { data } = await useFetch<ListResult<ITransaction>>("/api/finances/transactions");
        if (!data.value) return;

        this.totalTransactions = data.value.meta.total;
        this.transactions = data.value.data;
      }
      catch {
        toast.error(this.translate("toasts.errors.internal-server-error"));
      }
      finally {
        this.loading = false;
      }
    },
    async removeTransaction(transaction: ITransaction) {
      toast.promise($fetch<ITransaction>(`/api/finances/transactions/${transaction.id}`, {
        method: "DELETE",
      }), {
        loading: this.translate("app.finances.dashboard.toasts.remove-transaction.loading"),
        success: () => {
          this.transactions = this.transactions.filter(t => t.id !== transaction.id);
          this.totalTransactions--;
          return this.translate("app.finances.dashboard.toasts.remove-transaction.success");
        },
        error: () => this.translate("app.finances.dashboard.toasts.remove-transaction.error"),
      });
    },
    async addTransaction(body: ITransactionCreate): Promise<boolean> {
      this.loading = true;

      try {
        const transaction = await $fetch<ITransaction>("/api/finances/transactions", {
          method: "POST",
          body,
        });

        this.totalTransactions++;
        this.transactions = [transaction, ...this.transactions];
        return true;
      }
      catch {
        toast.error(this.translate("toasts.errors.internal-server-error"));
        return false;
      }
      finally {
        this.loading = false;
      }
    },
  },
});

import { toast } from "vue-sonner";
import type { ITransaction, ITransactionCreate } from "~/types/finances/transactions";
import type { ListQuery, ListResult, TNull } from "~/types/utils/globals";
import type { IFinanceStatistics } from "~/types/finances/statistics";

interface FinancesState {
  totalTransactions: number;
  transactions: ITransaction[];
  statistics: TNull<IFinanceStatistics>;
  loading: boolean;
  statisticsLoading: boolean;
}

export const useFinancesStore = defineStore("finances", {
  state: (): FinancesState => ({
    totalTransactions: -1,
    transactions: [],
    statistics: null,
    loading: false,
    statisticsLoading: false,
  }),
  getters: {
    translate: () => useNuxtApp().$i18n.t,
  },
  actions: {
    async loadTransactions(query?: ListQuery) {
      this.loading = true;

      try {
        const { data } = await useFetch<ListResult<ITransaction>>("/api/finances/transactions", {
          params: { ...query },
        });
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
    async loadStatistics() {
      this.statisticsLoading = true;

      try {
        const { data } = await useFetch<IFinanceStatistics>("/api/finances/statistics");
        if (!data.value) return;
        this.statistics = data.value;
      }
      catch {
        toast.error(this.translate("toasts.errors.internal-server-error"));
      }
      finally {
        this.statisticsLoading = false;
      }
    },
    async removeTransaction(transaction: ITransaction) {
      toast.promise($fetch<ITransaction>(`/api/finances/transactions/${transaction.id}`, {
        method: "DELETE",
      }), {
        loading: this.translate("app.finances.dashboard.toasts.remove-transaction.loading"),
        success: async () => {
          this.transactions = this.transactions.filter(t => t.id !== transaction.id);
          this.totalTransactions--;

          await this.loadStatistics();
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
        await this.loadStatistics();
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

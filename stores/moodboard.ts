import { toast } from "vue-sonner";
import type { IMoodEntry, IMoodEntryCreate } from "~/types/moods";
import type { ListResult } from "~/types/utils/globals";

interface MoodBoardState {
  todayEntries: IMoodEntry[];
  totalTodayEntries: number;
  historyEntries: IMoodEntry[];
  totalHistoryEntries: number;
  loading: boolean;
}

export const useMoodBoardStore = defineStore("moodBoard", {
  state: (): MoodBoardState => ({
    totalTodayEntries: -1,
    totalHistoryEntries: -1,
    todayEntries: [],
    historyEntries: [],
    loading: false,
  }),
  getters: {
    translate: () => useNuxtApp().$i18n.t,
    isTodayFirstLoading: state => state.totalTodayEntries === -1,
    isHistoryFirstLoading: state => state.totalHistoryEntries === -1,
  },
  actions: {
    async loadToday(page?: number, perPage?: number) {
      this.loading = true;

      try {
        const { data } = await useFetch<ListResult<IMoodEntry>>("/api/moodboard/", {
          params: {
            page,
            perPage,
          },
        });
        if (!data.value) return;

        this.todayEntries = data.value.data;
        this.totalTodayEntries = data.value.meta.total;
      }
      catch {
        toast.error(this.translate("toasts.errors.internal-server-error"));
      }
      finally {
        this.loading = false;
      }
    },
    async loadHistory(page?: number, perPage?: number) {
      this.loading = true;

      try {
        const { data } = await useFetch<ListResult<IMoodEntry>>("/api/moodboard/history", {
          params: {
            page,
            perPage,
          },
        });
        if (!data.value) return;

        this.historyEntries = data.value.data;
        this.totalHistoryEntries = data.value.meta.total;
      }
      catch {
        toast.error(this.translate("toasts.errors.internal-server-error"));
      }
      finally {
        this.loading = false;
      }
    },
    async removeEntry(entry: IMoodEntry) {
      toast.promise($fetch<IMoodEntry>(`/api/moodboard/entries/${entry.id}`, {
        method: "DELETE",
      }), {
        loading: this.translate("app.mood-board.toasts.remove-entry.loading"),
        success: (e: IMoodEntry) => {
          this.todayEntries = this.todayEntries.filter(entity => entity.id !== e.id);
          this.historyEntries = this.historyEntries.filter(entity => entity.id !== e.id);

          return this.translate("app.mood-board.toasts.remove-entry.success");
        },
        error: () => this.translate("app.mood-board.toasts.remove-entry.error"),
      });
    },
    async addEntry(body: IMoodEntryCreate): Promise<boolean> {
      this.loading = true;

      try {
        const entry = await $fetch<IMoodEntry>("/api/moodboard/entries", {
          method: "POST",
          body,
        });
        this.todayEntries = [entry, ...this.todayEntries];
        this.historyEntries = [entry, ...this.historyEntries];

        toast.success(this.translate("app.mood-board.toasts.entry-added"));
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

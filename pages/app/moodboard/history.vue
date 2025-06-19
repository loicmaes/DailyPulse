<script setup lang="ts">
import { ChevronLeft } from "lucide-vue-next";
import MoodBoardEntriesTable from "~/components/shared/mood-board/MoodBoardEntriesTable.vue";

definePageMeta({
  useAuth: true,
  isLoggedIn: true,
});

const store = useMoodBoardStore();
const { loading, historyEntries } = storeToRefs(store);

store.loadHistory();
</script>

<template>
  <main
    data-page="app.moodBoard.history"
    class="grid gap-4"
  >
    <header class="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        as-child
      >
        <NuxtLinkLocale to="/app/moodboard">
          <ChevronLeft />
        </NuxtLinkLocale>
      </Button>
      <h2 class="text-2xl font-bold">
        {{ $t("mood-board.history.title") }}
      </h2>
    </header>
    <div class="border rounded-md overflow-auto">
      <MoodBoardEntriesTable
        :data="historyEntries"
        :loading="loading && store.isHistoryFirstLoading"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
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
  <main data-page="app.moodBoard.history">
    <MoodBoardEntriesTable
      :data="historyEntries"
      :loading="loading && store.isHistoryFirstLoading"
    />
  </main>
</template>

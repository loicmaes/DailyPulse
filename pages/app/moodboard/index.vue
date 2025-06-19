<script setup lang="ts">
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";
import { Rocket, History } from "lucide-vue-next";
import MoodBoardEntriesTable from "~/components/shared/mood-board/MoodBoardEntriesTable.vue";
import AddMoodBoardEntryDialog from "~/components/shared/mood-board/AddMoodBoardEntryDialog.vue";

const { t } = useI18n();

definePageMeta({
  useAuth: true,
  isLoggedIn: true,
});

const store = useMoodBoardStore();
const { loading, todayEntries } = storeToRefs(store);

const heroSection = computed(() => {
  const index = Math.floor(Math.random() * 5);
  return {
    title: t(`mood-board.add-section[${index}].title`),
    caption: t(`mood-board.add-section[${index}].caption`),
    action: t(`mood-board.add-section[${index}].action`),
  };
});

store.loadToday();
</script>

<template>
  <main
    data-page="app.moodBoard.history"
    class="grid gap-4"
  >
    <section
      id="add-entry"
      class="min-h-[70dvh] flex flex-col items-center justify-center gap-4 py-16"
    >
      <ClientOnly>
        <DotLottieVue
          class="size-48 md:size-54"
          autoplay
          loop
          src="https://lottie.host/33c61a41-93f5-436b-8f20-61dcf295e4bc/vesyqtdGcX.lottie"
        />

        <template #fallback>
          <span class="block size-48 md:size-54 rounded-full bg-accent/50" />
        </template>
      </ClientOnly>

      <div class="grid gap-1 text-center">
        <h2 class="text-2xl font-bold">
          {{ heroSection.title }}
        </h2>
        <p class="max-w-[50ch] text-balance">
          {{ heroSection.caption }}
        </p>
      </div>

      <AddMoodBoardEntryDialog>
        <Button class="mt-4">
          {{ heroSection.action }}
          <Rocket />
        </Button>
      </AddMoodBoardEntryDialog>
    </section>
    <section
      id="entries-table"
      class="grid border rounded-md overflow-auto"
    >
      <header class="p-2 border-b flex items-center gap-2">
        <Input
          class="flex-1"
          disabled
        />
        <Button
          variant="outline"
          as-child
        >
          <NuxtLinkLocale to="/app/moodboard/history">
            <History />
            {{ $t("btn.history") }}
          </NuxtLinkLocale>
        </Button>
      </header>
      <MoodBoardEntriesTable
        :data="todayEntries"
        :loading="loading && store.isTodayFirstLoading"
        today
      />
    </section>
  </main>
</template>

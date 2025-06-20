<script setup lang="ts">
import { MoreVertical, Trash, Copy } from "lucide-vue-next";
import type { IMoodEntry } from "~/types/moods";
import ConfirmDialog from "~/components/shared/dialogs/ConfirmDialog.vue";

const deleteConfirm = ref<boolean>(false);

const props = defineProps<{
  entry: IMoodEntry;
}>();

const store = useMoodBoardStore();
const { copy } = useClipboard();

async function confirmDelete() {
  await store.removeEntry(props.entry);
}
</script>

<template>
  <div>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button
          size="icon"
          variant="ghost"
        >
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <!-- TODO: display if developer options are enabled -->
        <DropdownMenuItem @click="copy(entry.id)">
          <Copy />
          {{ $t("btn.copy-reference") }}
        </DropdownMenuItem>
        <DropdownMenuItem
          variant="destructive"
          @click="deleteConfirm = true"
        >
          <Trash />
          {{ $t("btn.delete") }}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <ConfirmDialog
      v-model:open="deleteConfirm"
      @confirmed="confirmDelete"
    >
      <template #title>
        {{ $t("app.mood-board.dialogs.confirm-deletion.title") }}
      </template>
      <template #caption>
        {{ $t("app.mood-board.dialogs.confirm-deletion.caption") }}
      </template>
    </ConfirmDialog>
  </div>
</template>

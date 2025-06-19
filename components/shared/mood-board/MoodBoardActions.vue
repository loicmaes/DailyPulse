<script setup lang="ts">
import { MoreVertical, Trash, Copy } from "lucide-vue-next";
import type { IMoodEntry } from "~/types/moods";
import ConfirmDialog from "~/components/shared/dialogs/ConfirmDialog.vue";

const deleteConfirm = ref<boolean>(false);

const props = defineProps<{
  entry: IMoodEntry;
}>();

const store = useMoodBoardStore();

async function copy() {
  await navigator.clipboard.writeText(props.entry.id);
}
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
        <DropdownMenuItem @click="copy">
          <Copy />
          {{ $t("mood-board.actions.copy-id") }}
        </DropdownMenuItem>
        <DropdownMenuItem
          variant="destructive"
          @click="deleteConfirm = true"
        >
          <Trash />
          {{ $t("mood-board.actions.delete") }}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <ConfirmDialog
      v-model:open="deleteConfirm"
      @confirmed="confirmDelete"
    />
  </div>
</template>

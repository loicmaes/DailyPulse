<script setup lang="ts">
import { Copy, MoreVertical, Trash } from "lucide-vue-next";
import type { ITransaction } from "~/types/finances/transactions";
import ConfirmDialog from "~/components/shared/dialogs/ConfirmDialog.vue";

const props = defineProps<{
  transaction: ITransaction;
}>();

const store = useFinancesStore();
const deleteConfirm = ref<boolean>(false);
const { copy } = useClipboard();

async function deleteTransaction() {
  await store.removeTransaction(props.transaction);
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
        <DropdownMenuItem @click="copy(transaction.id)">
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
      @confirmed="deleteTransaction"
    >
      <template #caption>
        {{ $t("app.finances.dashboard.dialogs.confirm-delete") }}
      </template>
    </ConfirmDialog>
  </div>
</template>

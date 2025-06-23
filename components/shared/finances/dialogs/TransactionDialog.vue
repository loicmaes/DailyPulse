<script setup lang="ts">
import { useForm } from "vee-validate";
import { LoaderCircle } from "lucide-vue-next";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import type { ETransactionType, ITransaction } from "~/types/finances/transactions";

const open = defineModel<boolean>("open");
watch(open, (val) => {
  if (!val) return;
  resetForm();
});

const props = defineProps<{
  transaction?: ITransaction;
  type: ETransactionType;
}>();

const store = useFinancesStore();
const { loading } = storeToRefs(store);
const editMode = computed(() => !!props.transaction);

const { handleSubmit, resetForm } = useForm({
  validationSchema: toTypedSchema(z.object({
    label: z.string(),
    amount: z.number().min(0),
    note: z.string().optional(),
  })),
  initialValues: {
    label: props.transaction?.label,
    amount: props.transaction?.amount,
    note: props.transaction?.note ?? undefined,
  },
});
const submit = handleSubmit(async (values) => {
  const create = async (): Promise<boolean> => store.addTransaction({
    ...values,
    type: props.type,
    date: new Date(),
  });
  const save = async (): Promise<boolean> => true;

  const state = editMode.value ? await save() : await create();
  if (!state) return;
  open.value = false;
});
</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ $t("app.finances.dashboard.dialogs.new-transaction.title", type === "expense" ? 2 : 1) }}</DialogTitle>
      </DialogHeader>

      <form
        class="grid gap-4"
        @submit="submit"
      >
        <FormField
          v-slot="{ componentField }"
          name="label"
        >
          <FormItem>
            <FormLabel>{{ $t("app.finances.dashboard.dialogs.new-transaction.fields.label") }}</FormLabel>
            <FormControl v-bind="componentField">
              <Input :disabled="loading" />
            </FormControl>
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField }"
          name="amount"
        >
          <FormItem>
            <FormLabel>{{ $t("app.finances.dashboard.dialogs.new-transaction.fields.amount") }}</FormLabel>
            <FormControl v-bind="componentField">
              <Input
                type="number"
                inputmode="numeric"
                :step=".01"
                placeholder="ex. 41.32"
                :disabled="loading"
              />
            </FormControl>
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField }"
          name="note"
        >
          <FormItem>
            <FormLabel>{{ $t("app.finances.dashboard.dialogs.new-transaction.fields.note") }} <span class="text-sm text-muted-foreground">{{ $t("labels.optional") }}</span></FormLabel>
            <FormControl v-bind="componentField">
              <Textarea :disabled="loading" />
            </FormControl>
          </FormItem>
        </FormField>

        <DialogFooter>
          <Button
            type="button"
            variant="secondary"
            :disabled="loading"
            @click="open = false"
          >
            {{ $t("btn.cancel") }}
          </Button>
          <Button
            type="submit"
            :disabled="loading"
            @click="open = false"
          >
            <LoaderCircle
              v-if="loading"
              class="animate-spin"
            />
            {{ $t("app.finances.dashboard.dialogs.new-transaction.action") }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

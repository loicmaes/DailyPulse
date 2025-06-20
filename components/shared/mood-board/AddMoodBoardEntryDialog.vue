<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

const store = useMoodBoardStore();
const open = defineModel<boolean>("open");
watch(open, (val) => {
  if (!val) return;
  resetForm();
});

const { list: moods } = useMood();

const { handleSubmit, resetForm } = useForm({
  validationSchema: toTypedSchema(z.object({
    mood: z.number().min(1).max(moods.length),
    note: z.string().optional(),
  })),
  initialValues: {
    mood: moods[0].value,
  },
});
const submit = handleSubmit(async (values) => {
  const state = await store.addEntry(values);

  if (!state) return;
  open.value = false;
});
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>

    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ $t("app.mood-board.dialogs.add-entry.title") }}</DialogTitle>
        <DialogDescription>{{ $t("app.mood-board.dialogs.add-entry.caption") }}</DialogDescription>
      </DialogHeader>

      <form
        class="grid gap-4"
        @submit="submit"
      >
        <FormField
          v-slot="{ componentField }"
          name="mood"
        >
          <FormItem>
            <FormLabel>{{ $t("app.mood-board.dialogs.add-entry.fields.mood") }}</FormLabel>
            <FormControl v-bind="componentField">
              <Select>
                <SelectTrigger class="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    v-for="mood in moods"
                    :key="mood.value"
                    :value="mood.value"
                  >
                    <span>{{ mood.emoji }}</span>
                    {{ mood.label }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField }"
          name="note"
        >
          <FormItem>
            <FormLabel>{{ $t("app.mood-board.dialogs.add-entry.fields.note.label") }} <span class="text-xs text-muted-foreground">{{ $t("labels.optional") }}</span></FormLabel>
            <FormControl v-bind="componentField">
              <Input />
            </FormControl>
            <FormDescription>{{ $t("app.mood-board.dialogs.add-entry.fields.note.caption") }}</FormDescription>
          </FormItem>
        </FormField>

        <DialogFooter>
          <DialogClose as-child>
            <Button
              type="button"
              variant="secondary"
            >
              {{ $t("btn.cancel") }}
            </Button>
            <Button type="submit">
              {{ $t("app.mood-board.dialogs.add-entry.action") }}
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

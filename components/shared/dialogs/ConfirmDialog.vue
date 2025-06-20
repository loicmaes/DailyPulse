<script setup lang="ts">
const open = defineModel<boolean>("open");

defineEmits<{
  confirmed: [];
}>();
</script>

<template>
  <AlertDialog v-model:open="open">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          <slot name="title">
            {{ $t("dialogs.confirm.title") }}
          </slot>
        </AlertDialogTitle>
        <AlertDialogDescription>
          <slot name="caption">
            {{ $t("dialogs.confirm.caption") }}
          </slot>
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel>{{ $t("btn.cancel") }}</AlertDialogCancel>
        <AlertDialogAction @click="$emit('confirmed')">
          {{ $t("btn.confirm") }}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

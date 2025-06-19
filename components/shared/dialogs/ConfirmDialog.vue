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
            Title
          </slot>
        </AlertDialogTitle>
        <AlertDialogDescription>
          <slot name="caption">
            Caption
          </slot>
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel>Annuler</AlertDialogCancel>
        <AlertDialogAction @click="$emit('confirmed')">
          Confirmer
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

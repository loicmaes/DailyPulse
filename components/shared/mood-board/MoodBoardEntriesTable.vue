<script setup lang="ts">
import type { IMoodEntry } from "~/types/moods";
import { columns } from "~/components/shared/mood-board/columns";

defineProps<{
  data: IMoodEntry[];
  loading: boolean;
  today?: boolean;
}>();
</script>

<template>
  <DataTable
    :columns="columns(today)"
    :data="data"
    :loading="loading"
  />
</template>

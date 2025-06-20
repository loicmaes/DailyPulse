<script setup lang="ts">
import { columns } from "~/components/shared/finances/table/columns";

const store = useFinancesStore();
const { transactions, loading } = storeToRefs(store);
</script>

<template>
  <DataTable
    :columns="columns()"
    :data="transactions"
    :loading="loading"
  >
    <template #loading-text>
      {{ $t("app.finances.dashboard.table.statements.loading-data") }}
    </template>
    <template #empty>
      {{ $t("app.finances.dashboard.table.statements.no-data") }}
    </template>
  </DataTable>
</template>

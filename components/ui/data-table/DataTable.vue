<script setup lang="ts" generic="TData, TValue">
import { type ColumnDef, FlexRender, getCoreRowModel, type Table, useVueTable } from "@tanstack/vue-table";

const props = defineProps<{
  table?: Table<TData>;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading?: boolean;
}>();

const table = computed(() => {
  if (props.table) return props.table;
  return useVueTable({
    get data() { return props.data; },
    get columns() { return props.columns; },
    getCoreRowModel: getCoreRowModel(),
  });
});
</script>

<template>
  <Table>
    <TableHeader>
      <TableRow
        v-for="headerGroup in table.getHeaderGroups()"
        :key="headerGroup.id"
      >
        <TableHead
          v-for="header in headerGroup.headers"
          :key="header.id"
        >
          <FlexRender
            v-if="!header.isPlaceholder"
            :render="header.column.columnDef.header"
            :props="header.getContext()"
          />
        </TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      <template v-if="table.getRowModel().rows?.length">
        <TableRow
          v-for="row in table.getRowModel().rows"
          :key="row.id"
        >
          <TableCell
            v-for="cell in row.getVisibleCells()"
            :key="cell.id"
          >
            <FlexRender
              :render="cell.column.columnDef.cell"
              :props="cell.getContext()"
            />
          </TableCell>
        </TableRow>
      </template>
      <template v-else>
        <TableRow v-if="loading">
          <TableCell
            :colspan="columns.length"
            class="h-24 text-center text-muted-foreground"
          >
            No results.
          </TableCell>
        </TableRow>
        <TableRow v-else>
          <TableCell
            :colspan="columns.length"
            class="h-24 text-center text-muted-foreground"
          >
            No results.
          </TableCell>
        </TableRow>
      </template>
    </TableBody>
  </Table>
</template>

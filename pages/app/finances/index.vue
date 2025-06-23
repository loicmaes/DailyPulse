<script setup lang="ts">
import { BanknoteArrowDown, BanknoteArrowUp, Plus, Search, LoaderCircle } from "lucide-vue-next";
import TransactionsTable from "~/components/shared/finances/table/TransactionsTable.vue";
import TransactionDialog from "~/components/shared/finances/dialogs/TransactionDialog.vue";
import type { ETransactionType } from "~/types/finances/transactions";
import FinanceStatCard from "~/components/shared/finances/FinanceStatCard.vue";

const { locale } = useI18n();

const store = useFinancesStore();
const { statisticsLoading, statistics } = storeToRefs(store);

store.loadStatistics();
store.loadTransactions({
  page: 1,
  perPage: 10,
});

const dialogOpen = ref<boolean>(false);
const newTransactionType = ref<ETransactionType>();

const openDialog = (type: ETransactionType) => {
  newTransactionType.value = type;
  dialogOpen.value = true;
};
</script>

<template>
  <main
    data-page="app.finances.dashboard"
    class="grid gap-4"
  >
    <header class="py-4 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between md:gap-0">
      <div class="grid">
        <h1 class="text-2xl font-bold">
          {{ $t("app.finances.dashboard.title") }}
        </h1>
        <p class="text-muted-foreground">
          {{ $t("app.finances.dashboard.caption") }}
        </p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button>
            <Plus />
            {{ $t("app.finances.dashboard.action.label") }}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem @click="openDialog('income')">
            <BanknoteArrowUp />
            {{ $t("app.finances.dashboard.action.options.new-income") }}
          </DropdownMenuItem>
          <DropdownMenuItem @click="openDialog('expense')">
            <BanknoteArrowDown />
            {{ $t("app.finances.dashboard.action.options.new-expense") }}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <TransactionDialog
        v-model:open="dialogOpen"
        :type="newTransactionType as ETransactionType"
      />
    </header>

    <section class="grid md:grid-cols-3 gap-4">
      <FinanceStatCard
        label="Abonnements mensuels"
        :value="statistics?.monthlySubscriptions"
        :loading="statisticsLoading"
      />
      <FinanceStatCard
        label="Abonnements annuels"
        :value="statistics?.annuallySubscriptions"
        :loading="statisticsLoading"
      />
      <FinanceStatCard
        label="Économies réalisées"
        :value="statistics?.savings"
        :loading="statisticsLoading"
      />
    </section>
    <section v-if="false">
      <Card>
        <CardHeader class="flex">
          <CardTitle class="text-sm">
            Activité
          </CardTitle>
        </CardHeader>
      </Card>
    </section>
    <section>
      <Card class="p-0 gap-0 grid">
        <header class="flex items-center gap-2 p-2 border-b">
          <div class="relative flex-1">
            <Input
              class="pl-8"
              :placeholder="$t('labels.search')"
              disabled
            />
            <Search class="absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
          </div>
        </header>

        <TransactionsTable />
      </Card>
    </section>
  </main>
</template>

import { TrendingDown, TrendingUp } from "lucide-vue-next";
import TransactionActions from "~/components/shared/finances/table/TransactionActions.vue";

export const columns = () => {
  const { t, locale } = useNuxtApp().$i18n;

  const nf = new Intl.NumberFormat(locale.value, {
    style: "currency",
    currency: "EUR",
  });
  const df = new Intl.DateTimeFormat(locale.value, {
    dateStyle: "long",
  });

  return [
    {
      accessorKey: "label",
      header: () => h("div", t("app.finances.dashboard.table.headers.label")),
      cell: ({ row }) => h("div", row.getValue("label")),
    },
    {
      accessorKey: "note",
      header: () => h("div", t("app.finances.dashboard.table.headers.note")),
      cell: ({ row }) => h("div", row.getValue("note") || "-"),
    },
    {
      accessorKey: "amount",
      header: () => h("div", t("app.finances.dashboard.table.headers.label")),
      cell: ({ row }) => h("div", { class: `flex items-center gap-2 ${row.original.type === "expense" ? "text-red-600 dark:text-red-400" : "text-blue-600 dark:text-blue-400"}` }, [
        h(row.original.type === "expense" ? TrendingDown : TrendingUp, { class: "size-4" }),
        h("span", nf.format(Number(row.getValue("amount")))),
      ]),
    },
    {
      accessorKey: "date",
      header: () => h("div", t("app.finances.dashboard.table.headers.saved-at")),
      cell: ({ row }) => h("div", df.format(new Date(row.getValue("date")))),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => h("div", { class: "flex justify-end" }, h(TransactionActions, { transaction: row.original })),
    },
  ];
};

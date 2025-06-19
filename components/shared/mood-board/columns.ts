import type { ColumnDef } from "@tanstack/vue-table";
import type { IMoodEntry } from "~/types/moods";
import MoodBoardActions from "~/components/shared/mood-board/MoodBoardActions.vue";

export const columns = (today?: boolean): ColumnDef<IMoodEntry>[] => {
  const { locale } = useNuxtApp().$i18n;

  const { findMood } = useMood();

  const tf = new Intl.DateTimeFormat(locale.value, {
    timeStyle: "short",
  });
  const df = new Intl.DateTimeFormat(locale.value, {
    dateStyle: "long",
    timeStyle: "short",
  });

  return [
    {
      accessorKey: "mood",
      header: () => h("div", "Humeur"),
      cell: ({ row }) => {
        const mood = findMood(Number(row.getValue("mood")));

        return h("div", { class: "flex items-center gap-2" }, [
          h("span", mood?.emoji ?? "?"),
          h("p", mood?.label ?? "-"),
        ]);
      },
    },
    {
      accessorKey: "note",
      header: () => h("div", "Note"),
      cell: ({ row }) => h("div", { class: "flex items-center gap-2" }, row.getValue("note") ?? "-"),
    },
    {
      accessorKey: "createdAt",
      header: () => h("div", today ? "Enregistré à" : "Enregistré le"),
      cell: ({ row }) => {
        const date = new Date(row.original.createdAt);

        return h("div", today ? tf.format(date) : df.format(date));
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => h("div", { class: "flex justify-end" }, h(MoodBoardActions, { entry: row.original })),
    },
  ];
};

import { ChartArea, Rainbow } from "lucide-vue-next";

export const useAppNavigation = () => {
  const { t } = useNuxtApp().$i18n;

  return [
    {
      icon: Rainbow,
      path: "/app/moodboard",
      label: t("app.navigation.mood-board"),
    },
    {
      icon: ChartArea,
      path: "/app/finances",
      label: t("app.navigation.finances"),
    },
  ];
};

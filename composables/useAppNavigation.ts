import { Rainbow } from "lucide-vue-next";

export const useAppNavigation = () => {
  return [
    {
      icon: Rainbow,
      path: "/app/moodboard",
      label: "Mon humeur",
    },
  ];
};

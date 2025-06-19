export const useMood = () => {
  const list = [
    {
      value: 1,
      emoji: "😄",
      label: "Heureux",
    },
    {
      value: 2,
      emoji: "🥰",
      label: "Amoureux",
    },
    {
      value: 3,
      emoji: "😌",
      label: "Apaisé",
    },
    {
      value: 4,
      emoji: "😎",
      label: "Confiant",
    },
    {
      value: 5,
      emoji: "😐",
      label: "Neutre",
    },
    {
      value: 6,
      emoji: "😴",
      label: "Fatigué",
    },
    {
      value: 7,
      emoji: "😔",
      label: "Triste",
    },
    {
      value: 8,
      emoji: "😡",
      label: "Énervé",
    },
    {
      value: 9,
      emoji: "😰",
      label: "Anxieux",
    },
    {
      value: 10,
      emoji: "😩",
      label: "Débordé",
    },
    {
      value: 11,
      emoji: "🤯",
      label: "Surmené",
    },
    {
      value: 12,
      emoji: "🤓",
      label: "Productif",
    },
    {
      value: 13,
      emoji: "🥳",
      label: "Excité",
    },
    {
      value: 14,
      emoji: "😇",
      label: "Reconnaissant",
    },
    {
      value: 15,
      emoji: "🤗",
      label: "Soutenu",
    },
  ] as const;

  return {
    list,
    findMood: (value: number) => list.find(m => m.value === value),
  };
};

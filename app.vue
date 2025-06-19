<script setup lang="ts">
import "vue-sonner/style.css";
import { useMediaQuery } from "@vueuse/core";

const colorMode = useColorMode();
const theme = computed((): "dark" | "light" => {
  if (colorMode.preference === "system")
    return useMediaQuery("(prefers-color-scheme: dark)").value ? "dark" : "light";

  return colorMode.preference as "dark" | "light";
});
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator />

    <ClientOnly>
      <Toaster
        position="top-center"
        :theme="theme"
        rich-colors
      />
    </ClientOnly>
    <NuxtLayout />
  </div>
</template>

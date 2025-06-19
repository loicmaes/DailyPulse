<script setup lang="ts">
import TopBar from "~/components/shared/application/TopBar.vue";
import BottomBar from "~/components/shared/application/BottomBar.vue";
</script>

<template>
  <div
    data-layout="default"
    class="px-4 flex flex-col items-center"
  >
    <TopBar />
    <BottomBar />

    <div class="w-[min(1080px,100%)] pt-4 pb-22 md:pb-4">
      <NuxtPage />
    </div>
  </div>
</template>

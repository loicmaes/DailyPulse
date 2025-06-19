<script setup lang="ts">
const links = useAppNavigation();
</script>

<template>
  <div class="fixed bottom-0 inset-x-0 z-10 flex md:hidden items-center justify-evenly px-4 py-2 bg-background">
    <Button
      v-for="link in links"
      :key="link.label"
      class="h-auto flex-col gap-0"
      variant="ghost"
      as-child
    >
      <NuxtLinkLocale
        :to="link.path"
        active-class="!bg-primary !text-primary-foreground"
      >
        <component
          :is="link.icon"
          class="size-6"
        />
        <span class="text-[.5rem]">
          {{ link.label }}
        </span>
      </NuxtLinkLocale>
    </Button>
  </div>
</template>

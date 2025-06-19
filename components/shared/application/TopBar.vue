<script setup lang="ts">
import { Bell } from "lucide-vue-next";
import BrandIcon from "~/components/shared/branding/BrandIcon.vue";
import UserContextMenu from "~/components/shared/user/UserContextMenu.vue";

const links = useAppNavigation();
</script>

<template>
  <header class="sticky top-0 z-10 w-full flex items-center justify-center h-16 bg-background">
    <div class="w-[min(1080px,100%)] flex items-center justify-between gap-10">
      <div class="flex items-center gap-3">
        <BrandIcon class="size-8 [&_>svg]:size-4.5" />
        <p class="font-bold">
          DailyPulse
        </p>
      </div>

      <nav class="flex-1 hidden md:flex items-center gap-1">
        <Button
          v-for="link in links"
          :key="link.label"
          variant="ghost"
          as-child
        >
          <NuxtLinkLocale
            :to="link.path"
            active-class="!bg-primary !text-primary-foreground"
          >
            <component :is="link.icon" />
            {{ link.label }}
          </NuxtLinkLocale>
        </Button>
      </nav>

      <div class="flex items-center gap-1">
        <Button
          size="icon"
          variant="ghost"
        >
          <Bell />
        </Button>
        <UserContextMenu />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import BrandIcon from "~/components/shared/branding/BrandIcon.vue";
</script>

<template>
  <div
    data-layout="auth"
    class="min-h-dvh grid md:grid-cols-2"
  >
    <header class="fixed top-6 left-1/2 md:left-6 -translate-x-1/2 md:translate-x-0 flex items-center gap-3">
      <BrandIcon class="size-8 [&>_svg]:size-4.5" />
      <p class="font-bold">
        Acme Inc.
      </p>
    </header>

    <section class="grid place-items-center">
      <NuxtPage />
    </section>
    <section class="bg-accent relative">
      <img
        src="~/assets/images/auth-placeholder.webp"
        class="absolute h-full w-full inset-0 object-cover"
        alt=""
        aria-hidden="true"
      >
    </section>
  </div>
</template>

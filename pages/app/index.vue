<script setup lang="ts">
definePageMeta({
  useAuth: true,
  isLoggedIn: true,
});
</script>

<template>
  <main data-page="app">
    {{ $t("hello-world") }}
  </main>
</template>

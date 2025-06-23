<script setup lang="ts">
import { LoaderCircle } from "lucide-vue-next";

const { locale } = useI18n();

const props = withDefaults(defineProps<{
  label: string;
  value?: number;
  loading?: boolean;
}>(), {
  value: 0,
  loading: false,
});

const currency = computed(() => Intl.NumberFormat(locale.value, {
  style: "currency",
  currency: "EUR",
}).format(props.value));
</script>

<template>
  <Card>
    <CardHeader class="flex">
      <CardTitle class="text-sm">
        {{ label }}
      </CardTitle>
    </CardHeader>

    <CardContent class="grid place-items-center">
      <LoaderCircle
        v-if="loading"
        class="animate-spin"
      />
      <p
        v-else
        class="text-5xl font-bold text-blue-600 dark:text-blue-400"
        :class="{
          'text-red-600 dark:text-red-400': value < 0,
        }"
      >
        {{ currency }}
      </p>
    </CardContent>
  </Card>
</template>

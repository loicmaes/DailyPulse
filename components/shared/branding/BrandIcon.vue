<script setup lang="ts">
import { AudioWaveform } from "lucide-vue-next";
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div :class="cn('grid place-items-center aspect-square w-10 rounded-md bg-primary text-primary-foreground', props.class)">
    <AudioWaveform />
  </div>
</template>

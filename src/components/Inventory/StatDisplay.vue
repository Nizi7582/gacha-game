<script setup>
import { defineProps } from "vue";

const { icon, value } = defineProps(["icon", "value"]);
</script>

<template>
  <div class="text-xl font-medium text-gray-300 flex flex-col items-center gap-y-2  justify-center">
    <img :src="icon" class="h-[3vh]" />
    <div>{{ value }}</div>
  </div>
</template>

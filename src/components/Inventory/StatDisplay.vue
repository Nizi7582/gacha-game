<script setup>
import { defineProps } from "vue";

const { icon, value } = defineProps(["icon", "value"]);
</script>

<template>
  <div class="text-lg font-medium text-gray-900 flex items-center gap-x-1 justify-center">
    <img :src="icon" class="h-4 -mt-1" />
    <div>: {{ value }}</div>
  </div>
</template>

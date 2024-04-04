<script setup>
import { defineProps } from "vue";

const { icon, value } = defineProps(["icon", "value"]);
</script>

<template>
  <div class="text-[1.2vw] font-medium text-gray-300 flex flex-col items-center justify-center">
    <img :src="icon" class="h-[7vh]" />
    <div>{{ value }}</div>
  </div>
</template>

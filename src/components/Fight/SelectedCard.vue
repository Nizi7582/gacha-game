<script setup>
import { defineProps } from "vue";

const { imageSelected } = defineProps(["imageSelected"]);
</script>

<template>
    <div class="rounded-xl">
        <img :src="imageSelected" class="w-full h-full rounded-xl" />
    </div>
</template>
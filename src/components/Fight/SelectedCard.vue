<script setup>
import { defineProps } from "vue";

const { imageSelected } = defineProps(["imageSelected"]);
</script>

<template>
    <div class="relative">
        <div class="rounded-xl h-full">
            <img :src="imageSelected" class="w-full h-full rounded-xl" />
        </div>
        <slot />
    </div>
    
</template>
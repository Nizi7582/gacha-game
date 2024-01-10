<script setup lang="ts">
const { imageSelected } = defineProps(["image"]);
</script>

<template>
    <div class="h-[30vh] w-[12vw] rounded-xl">
        <img :src="imageSelected" class="w-full h-full rounded-xl" />
    </div>
</template>
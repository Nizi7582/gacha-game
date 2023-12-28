<script setup lang="ts">

defineProps<{
  text: string;
}>()

function close_window() {
    window.close();
}
</script>

<template>
    <button  v-if="text != 'Quito Gamo'" class="text-5xl text-white transition hover:scale-125 hover:text-yellow-600">{{ text }}</button>
    <button type="button" @click="close_window()" v-else class="text-5xl text-white transition-all opacity-100 hover:opacity-0 ">{{ text }}</button>
</template>
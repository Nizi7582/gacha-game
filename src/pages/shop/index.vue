
<script setup lang="ts">
import { ref } from 'vue';

const userCards = ref([]);
</script>

<template>
  <div>
    <!-- Fixed background -->
    <div
      class="w-full h-screen bg-[url('~/assets/img/background_invocation.png')] bg-center bg-cover fixed top-0 -z-20"
    ></div>

    <!-- Page content -->
    <div class="relative z-10 p-4">
      <h2
        class="text-4xl font-semibold text-center text-gray-800 py-6 mb-4 text-white"
      >
        SHOP
      </h2>
    </div>
  </div>
</template>